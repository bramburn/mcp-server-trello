### Task List: Sprint 1 - Fix Card Creation Description

**Objective:** Modify the `add_card_to_list` tool to correctly handle the `description` field.

**Methodology:** Test-Driven Development (TDD). We will write a failing test first, then implement the code to make the test pass.

---

#### **Step 1: Write a Failing Test**

1.  **File:** `src/index.test.ts` (or a relevant new test file, e.g., `src/tools.test.ts`)
2.  **Action:** Add a new test case to verify that a card can be created with a description.
3.  **Details:**
    *   Mock the `TrelloClient.addCard` method.
    *   Call the `add_card_to_list` tool handler with `list_id`, `name`, and a sample `description`.
    *   Assert that the mocked `addCard` method was called with the correct `desc` parameter.
    *   This test should fail initially because the `description` parameter is not yet handled.

---

#### **Step 2: Update the Validator**

1.  **File:** `src/validators.ts`
2.  **Action:** Modify the `addCardRequestSchema` to include the optional `description` field.
3.  **Code Snippet:**
    ```typescript
    // In addCardRequestSchema
    description: z.string().optional(),
    ```

---

#### **Step 3: Update the Trello Client**

1.  **File:** `src/trello-client.ts`
2.  **Action:** Update the `addCard` method to accept the `description` and pass it to the Trello API call as the `desc` parameter.
3.  **Details:**
    *   Modify the method signature to `addCard(listId: string, name: string, description?: string)`.
    *   Conditionally add the `desc` property to the `params` object if a description is provided.

---

#### **Step 4: Update the Tool Definition**

1.  **File:** `src/index.ts`
2.  **Action:** Update the `add_card_to_list` tool definition.
3.  **Details:**
    *   Add `description` to the `properties` object in the tool's `parameters`.
    *   Update the `handler` to extract `description` from the validated parameters.
    *   Pass the `description` variable to the `trelloClient.addCard` method call.

---

#### **Step 5: Verify the Fix**

1.  **Action:** Run the test suite.
2.  **Expected Outcome:** The test case created in Step 1 should now pass, along with all other existing tests.
3.  **Final Check:** Manually inspect the code changes in all three files (`validators.ts`, `trello-client.ts`, `index.ts`) for correctness and clarity.
