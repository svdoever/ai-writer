export interface LintOptions {
    delimiter?: string;
    await?: boolean;
    preprocessorInclude?: boolean;
}
export declare function lint(text: string, opts?: LintOptions): (SyntaxError & {
    line: number;
    column: number;
    annotated: string;
    inspect: () => string;
}) | undefined;
