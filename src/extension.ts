import * as vscode from 'vscode';
import * as TOML from '@iarna/toml';
import {initializeTelemetryReporter, TelemetryLog} from "./telemetry";

// Helper function to format TOML string
function formatTOML(tomlString: string): string {
    const lines = tomlString.split('\n');
    let formattedLines: string[] = [];
    let currentIndent = 0;

    for (let line of lines) {
        line = line.trim();

        // Skip empty lines
        if (!line) {
            formattedLines.push('');
            continue;
        }

        // Handle table headers
        if (line.startsWith('[')) {
            // Add blank line before table unless it's the first line
            if (formattedLines.length > 0) {
                formattedLines.push('');
            }
            formattedLines.push(line);
            continue;
        }

        // Handle key-value pairs
        if (line.includes('=')) {
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('='); // Rejoin in case value contains =
            formattedLines.push(`${key.trim()} = ${value.trim()}`);
            continue;
        }

        // Handle arrays and other content
        formattedLines.push('  '.repeat(currentIndent) + line);
    }

    return formattedLines.join('\n');
}

export function activate(context: vscode.ExtensionContext) {
    initializeTelemetryReporter(context);
    TelemetryLog('info', 'Extension activated');

    // Register the formatting provider
    let disposable = vscode.languages.registerDocumentFormattingEditProvider('toml', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            TelemetryLog('info', 'Formatting TOML document');
            const text = document.getText();
            try {
                // Parse TOML to check validity
                const parsed = TOML.parse(text);

                // Format by stringifying and applying custom formatting
                let formatted = TOML.stringify(parsed);

                // Apply custom formatting
                formatted = formatTOML(formatted);

                // Return the formatting edit
                const firstLine = document.lineAt(0);
                const lastLine = document.lineAt(document.lineCount - 1);
                const range = new vscode.Range(
                    firstLine.range.start,
                    lastLine.range.end
                );

                return [vscode.TextEdit.replace(range, formatted)];
            } catch (error) {
                TelemetryLog('error', `Error formatting TOML: ${error}`);
                vscode.window.showErrorMessage('Error formatting TOML: Invalid syntax');
                return [];
            }
        }
    });

    // Register the document symbol provider
    let symbolProvider = vscode.languages.registerDocumentSymbolProvider('toml', {
        provideDocumentSymbols(document: vscode.TextDocument): vscode.SymbolInformation[] {
            const symbols: vscode.SymbolInformation[] = [];
            const text = document.getText();

            try {
                const parsed = TOML.parse(text);
                // Recursively add symbols from the parsed TOML
                function addSymbols(obj: any, container: string = '') {
                    for (const [key, value] of Object.entries(obj)) {
                        const path = container ? `${container}.${key}` : key;

                        if (typeof value === 'object' && value !== null) {
                            // Add table as container
                            symbols.push(new vscode.SymbolInformation(
                                key,
                                vscode.SymbolKind.Namespace,
                                container,
                                new vscode.Location(document.uri, new vscode.Position(0, 0))
                            ));
                            addSymbols(value, path);
                        } else {
                            // Add value as field
                            symbols.push(new vscode.SymbolInformation(
                                key,
                                vscode.SymbolKind.Field,
                                container,
                                new vscode.Location(document.uri, new vscode.Position(0, 0))
                            ));
                        }
                    }
                }

                addSymbols(parsed);
            } catch (error) {
                // Ignore parsing errors for symbol provider
            }

            return symbols;
        }
    });

    // Register diagnostic provider
    let diagnosticCollection = vscode.languages.createDiagnosticCollection('toml');

    function updateDiagnostics(document: vscode.TextDocument) {
        if (document.languageId !== 'toml') {
            return;
        }

        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();

        try {
            TOML.parse(text);
            // Clear diagnostics if parsing succeeds
            diagnosticCollection.set(document.uri, []);
        } catch (error: any) {
            // Add diagnostic for parsing error
            TelemetryLog('error', `Error parsing TOML: ${error}`);
            const message = error.message || 'Invalid TOML syntax';
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                message,
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
            diagnosticCollection.set(document.uri, diagnostics);
        }
    }

    // Update diagnostics on document changes
    let changeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
        updateDiagnostics(event.document);
    });

    // Update diagnostics on document open
    let openDisposable = vscode.workspace.onDidOpenTextDocument(document => {
        updateDiagnostics(document);
    });

    context.subscriptions.push(
        disposable,
        symbolProvider,
        diagnosticCollection,
        changeDisposable,
        openDisposable
    );
}

export function deactivate() {
    TelemetryLog('info', 'Extension deactivated');
}
