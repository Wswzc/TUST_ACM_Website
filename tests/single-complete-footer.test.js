/**
 * Property Test: Single Complete Footer
 * Feature: website-cleanup-enhancement, Property 3: Single Complete Footer
 * Validates: Requirements 1.5, 3.4
 * 
 * For any website page, there should be exactly one complete footer element 
 * containing all required information
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

// Property test implementation
function testSingleCompleteFooter() {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        return { success: false, error: 'HTML file not found', details: htmlPath };
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Test 1: Check for exactly one footer element
    const footerOpenings = htmlContent.match(/<footer[^>]*>/g);
    const footerClosings = htmlContent.match(/<\/footer>/g);
    
    if (!footerOpenings || footerOpenings.length === 0) {
        return { 
            success: false, 
            error: 'No footer element found', 
            details: 'The page must have exactly one footer element' 
        };
    }
    
    if (footerOpenings.length > 1) {
        return { 
            success: false, 
            error: 'Multiple footer elements found', 
            details: `Found ${footerOpenings.length} footer opening tags` 
        };
    }
    
    if (!footerClosings || footerClosings.length !== 1) {
        return { 
            success: false, 
            error: 'Footer element not properly closed', 
            details: `Found ${footerClosings ? footerClosings.length : 0} footer closing tags` 
        };
    }
    
    // Test 2: Extract footer content and check for completeness
    const footerStartIndex = htmlContent.indexOf('<footer');
    const footerEndIndex = htmlContent.indexOf('</footer>') + '</footer>'.length;
    const footerContent = htmlContent.substring(footerStartIndex, footerEndIndex);
    
    // Required footer elements for a complete footer
    const requiredElements = [
        { name: 'Logo or branding', pattern: /img[^>]*alt[^>]*logo/i },
        { name: 'Mission or description text', pattern: /TUST-ACM|算法实验室/i },
        { name: 'Social links', pattern: /<a[^>]*href[^>]*target="_blank"/i },
        { name: 'Copyright information', pattern: /©|copyright|&copy;/i },
        { name: 'Footer navigation or links', pattern: /<ul[^>]*nav|<nav/i }
    ];
    
    const missingElements = [];
    for (const element of requiredElements) {
        if (!element.pattern.test(footerContent)) {
            missingElements.push(element.name);
        }
    }
    
    if (missingElements.length > 0) {
        return { 
            success: false, 
            error: 'Footer is incomplete', 
            details: `Missing elements: ${missingElements.join(', ')}` 
        };
    }
    
    // Test 3: Check that footer is at the end of the body
    const bodyEndIndex = htmlContent.lastIndexOf('</body>');
    if (footerEndIndex > bodyEndIndex) {
        return { 
            success: false, 
            error: 'Footer is outside body element', 
            details: 'Footer must be inside the body element' 
        };
    }
    
    // Test 4: Check for duplicate footer content patterns
    const copyrightMatches = htmlContent.match(/©.*All rights reserved/gi);
    if (copyrightMatches && copyrightMatches.length > 1) {
        return { 
            success: false, 
            error: 'Duplicate copyright information found', 
            details: `Found ${copyrightMatches.length} copyright statements` 
        };
    }
    
    return { success: true };
}

// Run the property test
const singleFooterTest = new PropertyTest(
    'Single Complete Footer',
    testSingleCompleteFooter
);

const result = singleFooterTest.run();

// Export for potential use in other test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { singleFooterTest, result };
}

// Exit with appropriate code
process.exit(result.success ? 0 : 1);
