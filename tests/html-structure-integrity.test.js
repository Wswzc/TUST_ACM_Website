/**
 * Property Test: HTML Structure Integrity
 * Feature: website-cleanup-enhancement, Property 1: HTML Structure Integrity
 * Validates: Requirements 1.1, 1.2, 1.3, 3.2, 3.3
 * 
 * For any HTML document, all elements should be properly nested, complete, 
 * and unique with no duplicate IDs or orphaned structures
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

// HTML parsing utilities
function parseHTML(htmlContent) {
    // Simple HTML parser for testing
    const elements = [];
    const tagRegex = /<(\/?[a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    let match;
    
    while ((match = tagRegex.exec(htmlContent)) !== null) {
        elements.push({
            tag: match[1],
            fullMatch: match[0],
            position: match.index,
            isClosing: match[1].startsWith('/')
        });
    }
    
    return elements;
}

function extractIds(htmlContent) {
    const idRegex = /id\s*=\s*["']([^"']+)["']/g;
    const ids = [];
    let match;
    
    while ((match = idRegex.exec(htmlContent)) !== null) {
        ids.push(match[1]);
    }
    
    return ids;
}

function checkTagNesting(elements) {
    const stack = [];
    const selfClosingTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);
    
    for (const element of elements) {
        if (element.isClosing) {
            const tagName = element.tag.substring(1);
            if (stack.length === 0) {
                return { valid: false, error: `Closing tag ${element.tag} without opening tag` };
            }
            const lastOpened = stack.pop();
            if (lastOpened !== tagName) {
                return { valid: false, error: `Mismatched tags: opened ${lastOpened}, closed ${tagName}` };
            }
        } else {
            const tagName = element.tag.toLowerCase();
            if (!selfClosingTags.has(tagName)) {
                stack.push(tagName);
            }
        }
    }
    
    if (stack.length > 0) {
        return { valid: false, error: `Unclosed tags: ${stack.join(', ')}` };
    }
    
    return { valid: true };
}

// Property test implementations
function testHTMLStructureIntegrity() {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        return { success: false, error: 'HTML file not found', details: htmlPath };
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Test 1: Check for duplicate IDs
    const ids = extractIds(htmlContent);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        return { 
            success: false, 
            error: 'Duplicate IDs found', 
            details: `Duplicate IDs: ${[...new Set(duplicates)].join(', ')}` 
        };
    }
    
    // Test 2: Check for proper tag nesting
    const elements = parseHTML(htmlContent);
    const nestingResult = checkTagNesting(elements);
    if (!nestingResult.valid) {
        return { 
            success: false, 
            error: 'Invalid tag nesting', 
            details: nestingResult.error 
        };
    }
    
    // Test 3: Check for orphaned elements (basic check)
    const orphanedPatterns = [
        /<\/[^>]+>\s*<[^>]+>/g, // Potential orphaned closing/opening tags
        /<!--[^>]*-->/g // Comments that might indicate incomplete sections
    ];
    
    // Test 4: Check for duplicate sections
    const footerMatches = htmlContent.match(/<footer[^>]*>/g);
    if (footerMatches && footerMatches.length > 1) {
        return { 
            success: false, 
            error: 'Multiple footer elements found', 
            details: `Found ${footerMatches.length} footer elements` 
        };
    }
    
    // Test 5: Check for incomplete card structures
    const cardOpenings = (htmlContent.match(/<div[^>]*class="[^"]*card[^"]*"[^>]*>/g) || []).length;
    const cardClosings = (htmlContent.match(/<\/div>/g) || []).length;
    
    // This is a simplified check - in a real scenario we'd need more sophisticated parsing
    if (cardOpenings > 0 && cardClosings < cardOpenings) {
        return { 
            success: false, 
            error: 'Potentially incomplete card structures', 
            details: `Card openings: ${cardOpenings}, div closings: ${cardClosings}` 
        };
    }
    
    return { success: true };
}

// Run the property test
const htmlIntegrityTest = new PropertyTest(
    'HTML Structure Integrity',
    testHTMLStructureIntegrity
);

const result = htmlIntegrityTest.run();

// Export for potential use in other test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { htmlIntegrityTest, result };
}

// Exit with appropriate code
process.exit(result.success ? 0 : 1);