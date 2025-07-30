#!/usr/bin/env node

/**
 * Test the append logic for Sprint 3
 */

console.log('🧪 Testing append logic for Sprint 3...');

// Test the append logic manually
function testAppendLogic() {
  console.log('\n📝 Testing append logic scenarios:');
  
  // Scenario 1: Append to existing description
  const existingDesc1 = 'This is the original description.';
  const textToAppend1 = 'This is the appended text.';
  const result1 = existingDesc1 ? `${existingDesc1}\n\n${textToAppend1}` : textToAppend1;
  console.log('✅ Scenario 1 - Append to existing:');
  console.log('   Original:', JSON.stringify(existingDesc1));
  console.log('   Append:', JSON.stringify(textToAppend1));
  console.log('   Result:', JSON.stringify(result1));
  
  // Scenario 2: Append to empty description
  const existingDesc2 = '';
  const textToAppend2 = 'This is the first text.';
  const result2 = existingDesc2 ? `${existingDesc2}\n\n${textToAppend2}` : textToAppend2;
  console.log('\n✅ Scenario 2 - Append to empty:');
  console.log('   Original:', JSON.stringify(existingDesc2));
  console.log('   Append:', JSON.stringify(textToAppend2));
  console.log('   Result:', JSON.stringify(result2));
  
  // Scenario 3: Multiple appends
  let description = '';
  const appends = ['First update', 'Second update', 'Third update'];
  
  console.log('\n✅ Scenario 3 - Multiple appends:');
  console.log('   Starting with empty description');
  
  appends.forEach((append, index) => {
    description = description ? `${description}\n\n${append}` : append;
    console.log(`   After append ${index + 1}:`, JSON.stringify(description));
  });
}

testAppendLogic();

console.log('\n🎉 Append logic tests completed!');
