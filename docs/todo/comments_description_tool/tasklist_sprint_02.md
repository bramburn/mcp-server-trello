### Task List: Sprint 2 - Implement Description Update Tool

**Objective:** Create a new tool, `update_card_description`, to allow users to replace a card's entire description.

**Methodology:** TDD. Write a failing test, implement the feature, and confirm the test passes.

---

#### **Step 1: Write a Failing Test**

1.  **File:** `src/index.test.ts` (or a relevant test file)
2.  **Action:** Add a test case for the `update_card_description` tool.
3.  **Details:**
    *   Mock the `TrelloClient.updateCardDescription` method.
    *   Call the `update_card_description` tool handler with a `card_id` and a new `description`.
    *   Assert that the mocked method was called with the correct `cardId` and `description`.
    *   This test will fail as the tool and its components do not exist yet.

---

#### **Step 2: Create the Validator**

1.  **File:** `src/validators.ts`
2.  **Action:** Add a new `zod` schema and validation function for the update request.
3.  **Code Snippets:**
    ```typescript
    export const updateCardDescriptionRequestSchema = z.object({
      card_id: z.string(),
      description: z.string(),
    });

    export const validateUpdateCardDescriptionRequest = (params: any) => {
      return updateCardDescriptionRequestSchema.parse(params);
    };
    ```

---

#### **Step 3: Create the Trello Client Method**

1.  **File:** `src/trello-client.ts`
2.  **Action:** Add the `updateCardDescription` method.
3.  **Details:**
    *   The method should accept `cardId` and `description` as string arguments.
    *   It should make a `PUT` request to the `/cards/{id}` endpoint, passing `{ desc: description }` in the body.

---

#### **Step 4: Create the New Tool**

1.  **File:** `src/index.ts`
2.  **Action:** Define and register the new `update_card_description` tool.
3.  **Details:**
    *   Create a new tool definition object.
    *   Set the `name` to `update_card_description`.
    *   Define the `parameters`, making `card_id` and `description` required.
    *   In the `handler`, call the new validation function and then the `trelloClient.updateCardDescription` method with the validated parameters.
    *   Return a success message.

---

#### **Step 5: Verify Implementation**

1.  **Action:** Run the test suite.
2.  **Expected Outcome:** The test from Step 1 should now pass.
3.  **Final Check:** Review the newly added code in all files to ensure it is clean, correct, and follows project conventions.
