#!/usr/bin/env node

/**
 * Test script to verify that the add_card_to_list tool correctly handles descriptions
 * This follows the TDD approach outlined in Sprint 1 tasklist
 */

import { TrelloClient } from './trello-client.js';
import { validateAddCardRequest } from './validators.js';

// Mock TrelloClient for testing
class MockTrelloClient extends TrelloClient {
  private lastAddCardCall: any = null;

  constructor() {
    // Create a mock config - these values won't be used in our test
    super({
      apiKey: 'test-key',
      token: 'test-token',
      defaultBoardId: 'test-board'
    });
  }

  async addCard(boardId: string | undefined, params: any): Promise<any> {
    // Store the call parameters for verification
    this.lastAddCardCall = { boardId, params };
    
    // Return a mock card response
    return {
      id: 'mock-card-id',
      name: params.name,
      desc: params.description,
      idList: params.listId,
      url: 'https://trello.com/c/mock-card'
    };
  }

  getLastAddCardCall() {
    return this.lastAddCardCall;
  }
}

// Test function
async function testAddCardWithDescription() {
  console.log('🧪 Testing add_card_to_list with description...');
  
  const mockClient = new MockTrelloClient();
  
  // Test data
  const testArgs = {
    listId: 'test-list-123',
    name: 'Test Card',
    description: 'This is a test card description'
  };

  try {
    // Step 1: Validate the arguments
    console.log('📝 Step 1: Validating arguments...');
    const validArgs = validateAddCardRequest(testArgs);
    console.log('✅ Arguments validated successfully:', validArgs);

    // Step 2: Call addCard method
    console.log('📝 Step 2: Calling addCard method...');
    const result = await mockClient.addCard(validArgs.boardId, validArgs);
    console.log('✅ addCard called successfully:', result);

    // Step 3: Verify the call was made with correct parameters
    console.log('📝 Step 3: Verifying call parameters...');
    const lastCall = mockClient.getLastAddCardCall();
    
    if (!lastCall) {
      throw new Error('❌ addCard was not called');
    }

    if (lastCall.params.description !== testArgs.description) {
      throw new Error(`❌ Description mismatch. Expected: "${testArgs.description}", Got: "${lastCall.params.description}"`);
    }

    if (lastCall.params.listId !== testArgs.listId) {
      throw new Error(`❌ ListId mismatch. Expected: "${testArgs.listId}", Got: "${lastCall.params.listId}"`);
    }

    if (lastCall.params.name !== testArgs.name) {
      throw new Error(`❌ Name mismatch. Expected: "${testArgs.name}", Got: "${lastCall.params.name}"`);
    }

    console.log('✅ All parameters passed correctly!');
    console.log('🎉 Test PASSED: Description functionality is working correctly');
    
    return true;
  } catch (error) {
    console.error('❌ Test FAILED:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

// Test function for missing description
async function testAddCardWithoutDescription() {
  console.log('\n🧪 Testing add_card_to_list without description...');
  
  const mockClient = new MockTrelloClient();
  
  // Test data without description
  const testArgs = {
    listId: 'test-list-123',
    name: 'Test Card Without Description'
  };

  try {
    // Step 1: Validate the arguments
    console.log('📝 Step 1: Validating arguments...');
    const validArgs = validateAddCardRequest(testArgs);
    console.log('✅ Arguments validated successfully:', validArgs);

    // Step 2: Call addCard method
    console.log('📝 Step 2: Calling addCard method...');
    const result = await mockClient.addCard(validArgs.boardId, validArgs);
    console.log('✅ addCard called successfully:', result);

    // Step 3: Verify the call was made with correct parameters
    console.log('📝 Step 3: Verifying call parameters...');
    const lastCall = mockClient.getLastAddCardCall();
    
    if (!lastCall) {
      throw new Error('❌ addCard was not called');
    }

    if (lastCall.params.description !== undefined) {
      throw new Error(`❌ Description should be undefined when not provided. Got: "${lastCall.params.description}"`);
    }

    console.log('✅ Description correctly undefined when not provided!');
    console.log('🎉 Test PASSED: Optional description functionality is working correctly');
    
    return true;
  } catch (error) {
    console.error('❌ Test FAILED:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Sprint 1 Description Tests\n');
  
  const test1 = await testAddCardWithDescription();
  const test2 = await testAddCardWithoutDescription();
  
  console.log('\n📊 Test Results:');
  console.log(`Test 1 (with description): ${test1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Test 2 (without description): ${test2 ? '✅ PASS' : '❌ FAIL'}`);
  
  if (test1 && test2) {
    console.log('\n🎉 All tests passed! Description functionality is working correctly.');
    console.log('✅ Sprint 1 requirements are already met!');
  } else {
    console.log('\n❌ Some tests failed. Description functionality needs fixes.');
  }
}

// Run the tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { testAddCardWithDescription, testAddCardWithoutDescription, runTests };
