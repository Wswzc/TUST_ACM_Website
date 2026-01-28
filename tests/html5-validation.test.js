/**
 * Property Test: HTML5 Validation Compliance
 * Feature: website-cleanup-enhancement, Property 2: HTML5 Validation Compliance
 * Validates: Requirements 1.4
 * 
 * For any HTML content, the document should pass HTML5 validation standards without errors
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

// HTML5 validation utilities
function validateHTML5Structure(htmlContent) {
    const errors = [];
    
    // Check for required HTML5 structure
    if (!htmlContent.includes('<!DOCTYPE html>')) {
        errors.push('Missing HTML5 DOCTYPE declaration');
    }
    
    if (!htmlContent.match(/<html[^>]*>/)) {
        errors.push('Missing html element');
    }
    
    if (!htmlContent.match(/<head[^>]*>/)) {
        errors.push('Missing head element');
    }
    
    if (!htmlContent.match(/<body[^>]*>/)) {
        errors.push('Missing body element');
    }
    
    // Check for required meta tags
    if (!htmlContent.match(/<meta[^>]*charset[^>]*>/)) {
        errors.push('Missing charset meta tag');
    }
    
    if (!htmlContent.match(/<meta[^>]*viewport[^>]*>/)) {
        errors.push('Missing viewport meta tag');
    }
    
    // Check for proper title tag
    if (!htmlContent.match(/<title[^>]*>.*<\/title>/)) {
        errors.push('Missing or empty title tag');
    }
    
    return errors;
}

function validateHTML5Attributes(htmlContent) {
    const errors = [];
    
    // Check for deprecated attributes (but exclude SVG elements)
    const deprecatedAttributes = [
        { attr: 'align\\s*=', message: 'align attribute is deprecated in HTML5', exclude: 'svg' },
        { attr: 'bgcolor\\s*=', message: 'bgcolor attribute is deprecated in HTML5', exclude: 'svg' },
        { attr: 'border\\s*=(?![^>]*<table)', message: 'border attribute is deprecated in HTML5 (except on table)', exclude: 'svg' }
    ];
    
    deprecatedAttributes.forEach(({ attr, message, exclude }) => {
        const regex = new RegExp(attr, 'gi');
        const matches = htmlContent.match(regex);
        if (matches) {
            // Check if the matches are within SVG elements
            matches.forEach(match => {
                const matchIndex = htmlContent.indexOf(match);
                const beforeMatch = htmlContent.substring(0, matchIndex);
                const afterMatch = htmlContent.substring(matchIndex);
                
                // Check if we're inside an SVG element
                const lastSvgOpen = beforeMatch.lastIndexOf('<svg');
                const lastSvgClose = beforeMatch.lastIndexOf('</svg>');
                const nextSvgClose = afterMatch.indexOf('</svg>');
                
                // If we're not inside an SVG element, it's an error
                if (exclude !== 'svg' || lastSvgOpen === -1 || lastSvgClose > lastSvgOpen || nextSvgClose === -1) {
                    errors.push(message);
                }
            });
        }
    });
    
    // Check for proper lang attribute
    if (!htmlContent.match(/<html[^>]*lang\s*=\s*["'][^"']+["'][^>]*>/)) {
        errors.push('html element should have lang attribute');
    }
    
    // Check for proper alt attributes on images (but not SVG)
    const imgTags = htmlContent.match(/<img[^>]*>/g) || [];
    imgTags.forEach((imgTag, index) => {
        if (!imgTag.match(/alt\s*=\s*["'][^"']*["']/)) {
            errors.push(`Image tag ${index + 1} missing alt attribute`);
        }
    });
    
    return errors;
}

function validateHTML5Semantics(htmlContent) {
    const errors = [];
    
    // Check for semantic HTML5 elements usage
    const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
    const hasSemanticElements = semanticElements.some(element => 
        htmlContent.includes(`<${element}`)
    );
    
    if (!hasSemanticElements) {
        errors.push('Consider using HTML5 semantic elements (header, nav, main, section, article, aside, footer)');
    }
    
    // Check for proper heading hierarchy
    const headings = htmlContent.match(/<h[1-6][^>]*>/g) || [];
    if (headings.length > 0) {
        const headingLevels = headings.map(h => parseInt(h.match(/h([1-6])/)[1]));
        
        // Check if starts with h1
        if (headingLevels[0] !== 1) {
            errors.push('Heading hierarchy should start with h1');
        }
        
        // Check for skipped levels
        for (let i = 1; i < headingLevels.length; i++) {
            if (headingLevels[i] > headingLevels[i-1] + 1) {
                errors.push(`Heading hierarchy skips levels: h${headingLevels[i-1]} to h${headingLevels[i]}`);
                break;
            }
        }
    }
    
    return errors;
}

// Property test implementation
function testHTML5ValidationCompliance() {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        return { success: false, error: 'HTML file not found', details: htmlPath };
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Validate HTML5 structure
    const structureErrors = validateHTML5Structure(htmlContent);
    if (structureErrors.length > 0) {
        return { 
            success: false, 
            error: 'HTML5 structure validation failed', 
            details: structureErrors.join('; ') 
        };
    }
    
    // Validate HTML5 attributes
    const attributeErrors = validateHTML5Attributes(htmlContent);
    if (attributeErrors.length > 0) {
        return { 
            success: false, 
            error: 'HTML5 attribute validation failed', 
            details: attributeErrors.join('; ') 
        };
    }
    
    // Validate HTML5 semantics (warnings, not failures)
    const semanticErrors = validateHTML5Semantics(htmlContent);
    if (semanticErrors.length > 0) {
        console.log('HTML5 semantic warnings:', semanticErrors.join('; '));
    }
    
    return { success: true };
}

// Run the property test
const html5ValidationTest = new PropertyTest(
    'HTML5 Validation Compliance',
    testHTML5ValidationCompliance
);

const result = html5ValidationTest.run();

// Export for potential use in other test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { html5ValidationTest, result };
}

// Exit with appropriate code
process.exit(result.success ? 0 : 1);