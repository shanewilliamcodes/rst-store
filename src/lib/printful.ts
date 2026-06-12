// Printful API client. Server-side only — requires PRINTFUL_API_KEY.
// TODO(shane): create a Printful account, generate a token at
// https://www.printful.com/dashboard/settings/api and set PRINTFUL_API_KEY
// in .env.local and in Vercel project env vars. See docs/PRINTFUL-SETUP.md.

const PRINTFUL_API = "https://api.printful.com";

export function printfulEnabled() {
  return Boolean(process.env.PRINTFUL_API_KEY);
}

async function printfulFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${PRINTFUL_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body ? JSON.stringify(body.error) : response.statusText;
    throw new Error(`Printful ${path} failed (${response.status}): ${message}`);
  }
  return (body as { result: T }).result;
}

export type PrintfulRecipient = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  email?: string;
};

export type PrintfulOrderItem = { sync_variant_id: number; quantity: number };

export async function createPrintfulOrder(input: {
  externalId: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  confirm: boolean;
}) {
  // confirm=false creates a DRAFT order you review in the Printful dashboard
  // before it goes to print — the safe default until you trust the pipeline.
  return printfulFetch<{ id: number; status: string; dashboard_url?: string }>(
    `/orders?confirm=${input.confirm ? "true" : "false"}`,
    {
      method: "POST",
      body: JSON.stringify({
        external_id: input.externalId,
        recipient: input.recipient,
        items: input.items,
      }),
    },
  );
}
