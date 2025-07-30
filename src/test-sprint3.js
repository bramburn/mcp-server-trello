#!/usr/bin/env node

/**
 * Test for Sprint 3: append_to_card_description tool
 */

import { validateAppendToCardDescriptionRequest } from './validators.js';

console.log('🧪 Testing Sprint 3: append_to_card_description tool...');

// Test 1: Valid parameters
try {
  const testArgs1 = {
    card_id: 'test-card-123',
    text_to_append: 'This is additional text to append to the card description'
  };

  const result1 = validateAppendToCardDescriptionRequest(testArgs1);
  console.log('✅ Test 1 PASSED - Valid parameters:', result1);
} catch (error) {
  console.error('❌ Test 1 FAILED:', error.message);
}

// Test 2: Missing card_id
try {
  const testArgs2 = {
    text_to_append: 'This is text without card_id'
  };

  const result2 = validateAppendToCardDescriptionRequest(testArgs2);
  console.log('❌ Test 2 FAILED - Should have thrown error for missing card_id');
} catch (error) {
  console.log('✅ Test 2 PASSED - Correctly caught missing card_id:', error.message);
}

// Test 3: Missing text_to_append
try {
  const testArgs3 = {
    card_id: 'test-card-123'
  };

  const result3 = validateAppendToCardDescriptionRequest(testArgs3);
  console.log('❌ Test 3 FAILED - Should have thrown error for missing text_to_append');
} catch (error) {
  console.log('✅ Test 3 PASSED - Correctly caught missing text_to_append:', error.message);
}

// Test 4: Empty text_to_append (should fail since it's required)
try {
  const testArgs4 = {
    card_id: 'test-card-123',
    text_to_append: ''
  };

  const result4 = validateAppendToCardDescriptionRequest(testArgs4);
  console.log('❌ Test 4 FAILED - Should have thrown error for empty text_to_append');
} catch (error) {
  console.log('✅ Test 4 PASSED - Correctly caught empty text_to_append:', error.message);
}

console.log('🎉 Sprint 3 validation tests completed!');
