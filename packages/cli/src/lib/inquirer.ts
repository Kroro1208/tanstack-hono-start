type Inquirer = typeof import("inquirer").default;

let cachedInquirer: Inquirer | null = null;

export async function loadInquirer(): Promise<Inquirer> {
  if (cachedInquirer) return cachedInquirer;

  const mod = await import("inquirer");
  const resolved = mod.default;

  cachedInquirer = resolved;
  return resolved;
}
