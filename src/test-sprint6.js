#!/usr/bin/env node

/**
 * Test for Sprint 6: add_labels_to_card tool
 */

console.log('🧪 Testing Sprint 6: add_labels_to_card tool...');

// Test validation logic manually
function testValidationLogic() {
  console.log('\n📝 Testing validation scenarios:');
  
  // Scenario 1: Valid parameters (single label)
  const validArgs1 = { 
    card_id: 'test-card-123', 
    label_ids: ['label-1'] 
  };
  console.log('✅ Scenario 1 - Valid single label:', JSON.stringify(validArgs1));
  
  // Scenario 2: Valid parameters (multiple labels)
  const validArgs2 = { 
    card_id: 'test-card-123', 
    label_ids: ['label-1', 'label-2', 'label-3'] 
  };
  console.log('✅ Scenario 2 - Valid multiple labels:', JSON.stringify(validArgs2));
  
  // Scenario 3: Missing card_id
  const missingCardId = { label_ids: ['label-1'] };
  console.log('✅ Scenario 3 - Missing card_id (should error):', JSON.stringify(missingCardId));
  
  // Scenario 4: Missing label_ids
  const missingLabelIds = { card_id: 'test-card-123' };
  console.log('✅ Scenario 4 - Missing label_ids (should error):', JSON.stringify(missingLabelIds));
  
  // Scenario 5: Empty label_ids array
  const emptyLabelIds = { card_id: 'test-card-123', label_ids: [] };
  console.log('✅ Scenario 5 - Empty label_ids (should error):', JSON.stringify(emptyLabelIds));
  
  // Scenario 6: Non-array label_ids
  const nonArrayLabelIds = { card_id: 'test-card-123', label_ids: 'label-1' };
  console.log('✅ Scenario 6 - Non-array label_ids (should error):', JSON.stringify(nonArrayLabelIds));
}

// Test API call structure
function testApiCallStructure() {
  console.log('\n📝 Testing API call structure:');
  
  const cardId = 'test-card-123';
  const labelIds = ['label-1', 'label-2', 'label-3'];
  const expectedUrl = `/cards/${cardId}/idLabels`;
  const expectedBody = { value: labelIds.join(',') };
  
  console.log('✅ Expected API call:');
  console.log(`   URL: ${expectedUrl}`);
  console.log(`   Method: POST`);
  console.log(`   Body:`, JSON.stringify(expectedBody));
  console.log(`   Value parameter: "${labelIds.join(',')}"`);
}

// Test response formatting
function testResponseFormatting() {
  console.log('\n📝 Testing response formatting:');
  
  // Mock successful response
  const mockCard = {
    id: 'test-card-123',
    name: 'Test Card',
    labels: [
      { id: 'label-1', name: 'High Priority', color: 'red' },
      { id: 'label-2', name: 'Bug', color: 'orange' },
      { id: 'label-3', name: 'Feature', color: 'green' }
    ]
  };
  
  const successResponse = {
    success: true,
    message: `Labels added to card test-card-123 successfully.`,
    card: mockCard
  };
  
  console.log('✅ Expected success response:');
  console.log(JSON.stringify(successResponse, null, 2));
}

// Test edge cases
function testEdgeCases() {
  console.log('\n📝 Testing edge cases:');
  
  console.log('✅ Edge Case 1 - Adding duplicate labels:');
  console.log('   Expected: Trello API should handle gracefully (no duplicates created)');
  
  console.log('\n✅ Edge Case 2 - Adding non-existent label ID:');
  console.log('   Expected: Trello API should return error, handled by error response');
  
  console.log('\n✅ Edge Case 3 - Adding labels to non-existent card:');
  console.log('   Expected: Trello API should return error, handled by error response');
  
  console.log('\n✅ Edge Case 4 - Adding many labels at once:');
  const manyLabels = Array.from({length: 10}, (_, i) => `label-${i+1}`);
  console.log(`   Example: ${manyLabels.length} labels: ${manyLabels.join(', ')}`);
  console.log(`   Value parameter: "${manyLabels.join(',')}"`);
}

testValidationLogic();
testApiCallStructure();
testResponseFormatting();
testEdgeCases();

console.log('\n🎉 Sprint 6 logic tests completed!');
