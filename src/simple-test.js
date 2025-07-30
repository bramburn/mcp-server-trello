#!/usr/bin/env node

/**
 * Simple test to verify the description functionality
 */

import { validateAddCardRequest } from './validators.js';

console.log('🧪 Testing validateAddCardRequest with description...');

// Test 1: With description
try {
  const testArgs1 = {
    listId: 'test-list-123',
    name: 'Test Card',
    description: 'This is a test card description'
  };

  const result1 = validateAddCardRequest(testArgs1);
  console.log('✅ Test 1 PASSED - With description:', result1);
} catch (error) {
  console.error('❌ Test 1 FAILED:', error.message);
}

// Test 2: Without description
try {
  const testArgs2 = {
    listId: 'test-list-123',
    name: 'Test Card Without Description'
  };

  const result2 = validateAddCardRequest(testArgs2);
  console.log('✅ Test 2 PASSED - Without description:', result2);
} catch (error) {
  console.error('❌ Test 2 FAILED:', error.message);
}

console.log('🎉 Validation tests completed!');
