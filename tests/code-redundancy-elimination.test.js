/**
 * Property Test: Code Redundancy Elimination
 * Feature: website-cleanup-enhancement, Property 6: Code Redundancy Elimination
 * Validates: Requirements 3.1, 3.5
 * 
 * For any CSS or JavaScript code, there should be no duplicate styles, 
 * functions, or conflicting rules
 */

const fs = require('fs');
const path = require('path');

// Simple property-based test framework
class PropertyTest {
    constructor(name, property) {
        this.name = name;
        this.property = property;
        this.iterations = 100;
    }

    run() {
        console.log(`Running property test: ${this.name}`);
        let passed = 0;
        let failed = 0;
        let failures = [];

        for (let i = 0; i < this.iterations; i++) {
            try {
                const result = this.property();
                if (result.success) {
                    passed++;
                } else {
                    failed++;
                    failures.push({
                        iteration: i + 1,
                        error: result.error,
                        details: result.details
                    });
                }
            } catch (error) {
                failed++;
                failures.push({
                    iteration: i + 1,
                    error: error.message,
                    details: error.stack
                });
            }
        }

        const success = failed === 0;
        console.log(`Results: ${passed} passed, ${failed} failed`);
        
        if (!success) {
            console.log('Failures:', failures.slice(0, 5)); // Show first 5 failures
        }

        return { success, passed, failed, failures };
    }
}

// Utility functions
function extractScriptSources(htmlContent) {
    const scriptRegex = /<script[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/g;
    const sources = [];
    let match;
    
    while ((match = scriptRegex.exec(htmlContent)) !== null) {
        sources.push(match[1]);
    }
    
    return sources;
}

function extractStylesheetLinks(htmlContent) {
    const linkRegex = /<link[^>]*rel\s*=\s*["']stylesheet["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*>/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(htmlContent)) !== null) {
        links.push(match[1]);
    }
    
    return links;
}

function extractInlineStyles(htmlContent) {
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
    const styles = [];
    let match;
    
    while ((match = styleRegex.exec(htmlContent)) !== null) {
        styles.push(match[1]);
    }
    
    return styles;
}

function extractInlineScripts(htmlContent) {
    const scriptRegex = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g;
    const scripts = [];
    let match;
    
    while ((match = scriptRegex.exec(htmlContent)) !== null) {
        scripts.push(match[1]);
    }
    
    return scripts;
}

function findDuplicateCSSRules(cssContent) {
    // Extract CSS rules (simplified)
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    const rules = new Map();
    const duplicates = [];
    let match;
    
    while ((match = ruleRegex.exec(cssContent)) !== null) {
        const selector = match[1].trim();
        const properties = match[2].trim();
        
        if (rules.has(selector)) {
            const existingProps = rules.get(selector);
            // Check for conflicting properties
            const existingPropMap = parseProperties(existingProps);
            const newPropMap = parseProperties(properties);
            
            for (const [prop, value] of newPropMap) {
                if (existingPropMap.has(prop) && existingPropMap.get(prop) !== value) {
                    duplicates.push({
                        selector,
                        property: prop,
                        value1: existingPropMap.get(prop),
                        value2: value
                    });
                }
            }
        } else {
            rules.set(selector, properties);
        }
    }
    
    return duplicates;
}

function parseProperties(propertiesString) {
    const propMap = new Map();
    const props = propertiesString.split(';').filter(p => p.trim());
    
    for (const prop of props) {
        const [key, value] = prop.split(':').map(s => s.trim());
        if (key && value) {
            propMap.set(key, value);
        }
    }
    
    return propMap;
}

function findDuplicateFunctions(jsContent) {
    // Extract function declarations (simplified)
    const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    const functions = [];
    let match;
    
    while ((match = functionRegex.exec(jsContent)) !== null) {
        functions.push(match[1]);
    }
    
    const duplicates = functions.filter((fn, index) => functions.indexOf(fn) !== index);
    return [...new Set(duplicates)];
}

// Property test implementation
function testCodeRedundancyElimination() {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        return { success: false, error: 'HTML file not found', details: htmlPath };
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Test 1: Check for duplicate script sources
    const scriptSources = extractScriptSources(htmlContent);
    const uniqueScripts = new Set(scriptSources);
    if (scriptSources.length !== uniqueScripts.size) {
        const duplicates = scriptSources.filter((src, index) => scriptSources.indexOf(src) !== index);
        return { 
            success: false, 
            error: 'Duplicate script sources found', 
            details: `Duplicate scripts: ${[...new Set(duplicates)].join(', ')}` 
        };
    }
    
    // Test 2: Check for duplicate stylesheet links
    const stylesheetLinks = extractStylesheetLinks(htmlContent);
    const uniqueStylesheets = new Set(stylesheetLinks);
    if (stylesheetLinks.length !== uniqueStylesheets.size) {
        const duplicates = stylesheetLinks.filter((link, index) => stylesheetLinks.indexOf(link) !== index);
        return { 
            success: false, 
            error: 'Duplicate stylesheet links found', 
            details: `Duplicate stylesheets: ${[...new Set(duplicates)].join(', ')}` 
        };
    }
    
    // Test 3: Check inline styles for conflicting rules
    const inlineStyles = extractInlineStyles(htmlContent);
    for (const styleBlock of inlineStyles) {
        const conflicts = findDuplicateCSSRules(styleBlock);
        if (conflicts.length > 0) {
            return { 
                success: false, 
                error: 'Conflicting CSS rules found in inline styles', 
                details: `Conflicts: ${JSON.stringify(conflicts.slice(0, 3))}` 
            };
        }
    }
    
    // Test 4: Check inline scripts for duplicate function declarations
    const inlineScripts = extractInlineScripts(htmlContent);
    for (const scriptBlock of inlineScripts) {
        const duplicateFunctions = findDuplicateFunctions(scriptBlock);
        if (duplicateFunctions.length > 0) {
            return { 
                success: false, 
                error: 'Duplicate function declarations found', 
                details: `Duplicate functions: ${duplicateFunctions.join(', ')}` 
            };
        }
    }
    
    // Test 5: Check for unused/orphaned modal or popup elements
    const modalPattern = /<div[^>]*class="[^"]*modal[^"]*"[^>]*id="([^"]+)"/g;
    const modals = [];
    let match;
    
    while ((match = modalPattern.exec(htmlContent)) !== null) {
        modals.push(match[1]);
    }
    
    // Check if modals are referenced in JavaScript or data attributes
    for (const modalId of modals) {
        const isReferenced = 
            htmlContent.includes(`data-target="#${modalId}"`) ||
            htmlContent.includes(`data-toggle="modal"`) && htmlContent.includes(`#${modalId}`) ||
            htmlContent.includes(`$('#${modalId}')`);
        
        if (!isReferenced) {
            return { 
                success: false, 
                error: 'Orphaned modal element found', 
                details: `Modal with id="${modalId}" is never triggered or referenced` 
            };
        }
    }
    
    // Test 6: Check for duplicate HTML sections (same content repeated)
    // This test checks for truly identical sections, not just similar structure
    const sectionPattern = /<section[^>]*>([\s\S]*?)<\/section>/g;
    const sections = [];
    
    while ((match = sectionPattern.exec(htmlContent)) !== null) {
        const content = match[1].trim();
        // Only flag as duplicate if content is substantial and truly identical
        if (content.length > 200) {
            sections.push(content);
        }
    }
    
    // Check for exact duplicates only
    const sectionCounts = new Map();
    for (const section of sections) {
        sectionCounts.set(section, (sectionCounts.get(section) || 0) + 1);
    }
    
    const duplicateSections = Array.from(sectionCounts.entries()).filter(([_, count]) => count > 1);
    if (duplicateSections.length > 0) {
        return { 
            success: false, 
            error: 'Duplicate section content detected', 
            details: `Found ${duplicateSections.length} sections with identical content (${duplicateSections[0][0].substring(0, 100)}...)` 
        };
    }
    
    return { success: true };
}

// Run the property test
const redundancyTest = new PropertyTest(
    'Code Redundancy Elimination',
    testCodeRedundancyElimination
);

const result = redundancyTest.run();

// Export for potential use in other test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { redundancyTest, result };
}

// Exit with appropriate code
process.exit(result.success ? 0 : 1);
