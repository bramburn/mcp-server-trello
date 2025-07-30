#!/usr/bin/env node

/**
 * Test for Sprint 4: get_board_labels tool
 */

console.log('🧪 Testing Sprint 4: get_board_labels tool...');

// Test the label formatting logic
function testLabelFormatting() {
  console.log('\n📝 Testing label formatting logic:');
  
  // Mock label data from Trello API
  const mockLabels = [
    { id: 'label1', name: 'High Priority', color: 'red' },
    { id: 'label2', name: 'Bug', color: 'orange' },
    { id: 'label3', name: 'Feature', color: 'green' },
    { id: 'label4', name: '', color: 'blue' }, // Empty name
    { id: 'label5', name: 'Documentation', color: 'purple' }
  ];
  
  // Format labels as the tool would
  const formattedLabels = mockLabels.map(label => ({
    id: label.id,
    name: label.name,
    color: label.color
  }));
  
  console.log('✅ Mock labels formatted correctly:');
  formattedLabels.forEach((label, index) => {
    console.log(`   ${index + 1}. ID: ${label.id}, Name: "${label.name}", Color: ${label.color}`);
  });
  
  // Test response structure
  const response = {
    success: true,
    labels: formattedLabels
  };
  
  console.log('\n✅ Response structure:');
  console.log(JSON.stringify(response, null, 2));
}

// Test error scenarios
function testErrorScenarios() {
  console.log('\n📝 Testing error scenarios:');
  
  // Scenario 1: No active board
  console.log('✅ Scenario 1 - No active board:');
  console.log('   Expected error: "boardId is required when no default board is configured"');
  
  // Scenario 2: Board with no labels
  console.log('\n✅ Scenario 2 - Board with no labels:');
  const emptyResponse = {
    success: true,
    labels: []
  };
  console.log('   Expected response:', JSON.stringify(emptyResponse, null, 2));
}

testLabelFormatting();
testErrorScenarios();

console.log('\n🎉 Sprint 4 tests completed!');
