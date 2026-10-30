/* The slice of Bun's built-in Postgres client that sync-courses.ts uses, so
   the website type-checks without taking on @types/bun for one script. */
declare module "bun" {
	interface SQL {
		<T = Record<string, unknown>>(
			strings: TemplateStringsArray,
			...values: unknown[]
		): Promise<T[]>;
		unsafe(query: string): { simple(): Promise<unknown> };
		array(values: readonly string[], type: "text"): unknown;
		close(): Promise<void>;
	}
	export const SQL: new (url: string, options?: { max?: number }) => SQL;
}
