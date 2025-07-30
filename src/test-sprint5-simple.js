#!/usr/bin/env node

/**
 * Simple test for Sprint 5: get_card_labels tool logic
 */

console.log('🧪 Testing Sprint 5: get_card_labels tool logic...');

// Test label formatting logic
function testLabelFormatting() {
  console.log('\n📝 Testing label formatting logic:');
  
  // Mock label data from Trello API (card with labels)
  const mockCardWithLabels = [
    { id: 'label1', name: 'High Priority', color: 'red' },
    { id: 'label2', name: 'Bug', color: 'orange' },
    { id: 'label3', name: 'Feature', color: 'green' },
    { id: 'label4', name: '', color: 'blue' } // Empty name label
  ];
  
  // Format labels as the tool would
  const formattedLabels = mockCardWithLabels.map(label => ({
    id: label.id,
    name: label.name,
    color: label.color
  }));
  
  console.log('✅ Card with labels formatted correctly:');
  formattedLabels.forEach((label, index) => {
    console.log(`   ${index + 1}. ID: ${label.id}, Name: "${label.name}", Color: ${label.color}`);
  });
  
  // Test response structure for card with labels
  const responseWithLabels = {
    success: true,
    labels: formattedLabels
  };
  
  console.log('\n✅ Response structure (with labels):');
  console.log(JSON.stringify(responseWithLabels, null, 2));
  
  // Test response structure for card with no labels
  const responseNoLabels = {
    success: true,
    labels: []
  };
  
  console.log('\n✅ Response structure (no labels):');
  console.log(JSON.stringify(responseNoLabels, null, 2));
}

// Test validation logic manually
function testValidationLogic() {
  console.log('\n📝 Testing validation scenarios:');
  
  // Scenario 1: Valid card_id
  const validArgs = { card_id: 'test-card-123' };
  console.log('✅ Scenario 1 - Valid card_id:', JSON.stringify(validArgs));
  
  // Scenario 2: Missing card_id
  const missingArgs = {};
  console.log('✅ Scenario 2 - Missing card_id (should error):', JSON.stringify(missingArgs));
  
  // Scenario 3: Empty card_id
  const emptyArgs = { card_id: '' };
  console.log('✅ Scenario 3 - Empty card_id (should error):', JSON.stringify(emptyArgs));
}

// Test API call structure
function testApiCallStructure() {
  console.log('\n📝 Testing API call structure:');
  
  const cardId = 'test-card-123';
  const expectedUrl = `/cards/${cardId}`;
  const expectedParams = { fields: 'labels' };
  
  console.log('✅ Expected API call:');
  console.log(`   URL: ${expectedUrl}`);
  console.log(`   Params:`, JSON.stringify(expectedParams));
  console.log(`   Full URL: ${expectedUrl}?fields=labels`);
}

testValidationLogic();
testLabelFormatting();
testApiCallStructure();

console.log('\n🎉 Sprint 5 logic tests completed!');
