# Enhanced TOML

A powerful TOML extension for VS Code that enhances your editing experience with intelligent features, precise formatting, and real-time validation. Perfect for managing configuration files, project metadata, and build settings.

## Why Enhanced TOML?

- 🚀 **Advanced Formatting Engine**: Smart, configurable formatting that respects your style
- 🔍 **Intelligent Error Detection**: Real-time syntax validation with detailed diagnostics
- 📑 **Rich Document Navigation**: Quick jump between sections with document outline
- 🎨 **Premium Syntax Highlighting**: Clear, customizable syntax coloring
- ⚡ **High Performance**: Fast and efficient, even with large files

## ✨ Features

### 🎨 Premium Syntax Highlighting
- Enhanced token-based highlighting
- Distinct colors for different TOML elements
- Support for nested structures
- Clear comment and string highlighting

### 📝 Intelligent Formatting
- Context-aware formatting (`Alt+Shift+F`)
- Smart table and array alignment
- Configurable spacing rules
- Comment preservation

```toml
# Before formatting
[server]
host="localhost"
port=8080
  enabled=true

# After formatting
[server]
host = "localhost"
port = 8080
enabled = true
```

### 🔍 Advanced Error Detection
- Immediate syntax validation
- Detailed error messages
- Quick-fix suggestions
- Context-aware diagnostics

### 📑 Smart Document Outline
- Full document structure view
- Quick section navigation
- Table and key previews
- Hierarchical organization

## 🚀 Getting Started

1. Open VS Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS)
3. Type `ext install enhanced-toml`
4. Press Enter

Or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Shellomo.enhanced-toml).

## 📖 Usage Examples

### Configuration Files
```toml
[package]
name = "my-project"
version = "1.0.0"
authors = ["Your Name <your.email@example.com>"]

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.0", features = ["full"] }

[profile.release]
opt-level = 3
lto = true
```

### Environment Configuration
```toml
[development]
database_url = "postgres://localhost/dev_db"
debug = true
log_level = "debug"

[production]
database_url = "postgres://prod-server/prod_db"
debug = false
log_level = "warn"
```

## ⚙️ Extension Settings

Customize Enhanced TOML to match your preferences:

* `enhancedToml.format.alignEqual`: Align equal signs in consecutive lines
* `enhancedToml.format.indentTables`: Indent content under table headers
* `enhancedToml.format.newlineBetweenTables`: Add newline between table sections
* `enhancedToml.theme.customColors`: Define custom syntax highlighting colors

## 🔧 Keyboard Shortcuts

- Format document: `Alt+Shift+F`
- Show document outline: `Ctrl+Shift+O`
- Toggle comment: `Ctrl+/`
- Quick fix: `Ctrl+.`

## 💡 Perfect For

- ✅ Cargo.toml for Rust projects
- ✅ Poetry/pyproject.toml for Python
- ✅ Application configurations
- ✅ CI/CD pipeline configs
- ✅ Project metadata
- ✅ Package manager configs
- ✅ Environment settings

## 📋 Supported TOML Features

- ✅ Basic key/value pairs
- ✅ Tables and nested tables
- ✅ Array of tables
- ✅ Inline tables
- ✅ Arrays and mixed-type arrays
- ✅ String literals (basic and multi-line)
- ✅ Integer types (decimal and hex)
- ✅ Float types
- ✅ Boolean values
- ✅ Datetime (offset and local)
- ✅ Comments (single-line and wrapped)

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

## 🐛 Known Issues

See our [Issue Tracker](https://github.com/Shellomo/vscode_ext_enhanced_toml/issues) for current known issues.

---

**Enjoy Enhanced TOML!** 🎉

*If you find this extension helpful, please consider leaving a review on the VS Code Marketplace!*