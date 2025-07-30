#!/usr/bin/env node

/**
 * Test for Sprint 2: update_card_description tool
 */

import { validateUpdateCardDescriptionRequest } from './validators.js';

console.log('🧪 Testing Sprint 2: update_card_description tool...');

// Test 1: Valid parameters
try {
  const testArgs1 = {
    card_id: 'test-card-123',
    description: 'This is the new updated description for the card'
  };

  const result1 = validateUpdateCardDescriptionRequest(testArgs1);
  console.log('✅ Test 1 PASSED - Valid parameters:', result1);
} catch (error) {
  console.error('❌ Test 1 FAILED:', error.message);
}

// Test 2: Missing card_id
try {
  const testArgs2 = {
    description: 'This is a description without card_id'
  };

  const result2 = validateUpdateCardDescriptionRequest(testArgs2);
  console.log('❌ Test 2 FAILED - Should have thrown error for missing card_id');
} catch (error) {
  console.log('✅ Test 2 PASSED - Correctly caught missing card_id:', error.message);
}

// Test 3: Missing description
try {
  const testArgs3 = {
    card_id: 'test-card-123'
  };

  const result3 = validateUpdateCardDescriptionRequest(testArgs3);
  console.log('❌ Test 3 FAILED - Should have thrown error for missing description');
} catch (error) {
  console.log('✅ Test 3 PASSED - Correctly caught missing description:', error.message);
}

// Test 4: Empty description (should be allowed)
try {
  const testArgs4 = {
    card_id: 'test-card-123',
    description: ''
  };

  const result4 = validateUpdateCardDescriptionRequest(testArgs4);
  console.log('✅ Test 4 PASSED - Empty description allowed:', result4);
} catch (error) {
  console.error('❌ Test 4 FAILED:', error.message);
}

console.log('🎉 Sprint 2 validation tests completed!');
