### Task List: Sprint 3 - Implement Description Append Tool

**Objective:** Create a new tool, `append_to_card_description`, to add text to the end of a card's existing description.

**Methodology:** TDD. Write failing tests, implement the logic, and ensure tests pass.

---

#### **Step 1: Write Failing Tests**

1.  **File:** `src/index.test.ts` (or a relevant test file)
2.  **Action:** Add test cases for the `append_to_card_description` tool.
3.  **Details:**
    *   **Test Case 1 (Append to existing):** Mock `TrelloClient.getCardDescription` to return an existing description. Mock `TrelloClient.updateCardDescription`. Call the tool's handler. Assert that `updateCardDescription` is called with the old and new text combined correctly (e.g., with newlines).
    *   **Test Case 2 (Append to empty):** Mock `TrelloClient.getCardDescription` to return an empty string. Call the handler. Assert that `updateCardDescription` is called with just the new text.
    *   These tests will fail as the components are not yet implemented.

---

#### **Step 2: Create the Validator**

1.  **File:** `src/validators.ts`
2.  **Action:** Add a new `zod` schema and validation function for the append request.
3.  **Code Snippets:**
    ```typescript
    export const appendToCardDescriptionRequestSchema = z.object({
      card_id: z.string(),
      text_to_append: z.string(),
    });

    export const validateAppendToCardDescriptionRequest = (params: any) => {
      return appendToCardDescriptionRequestSchema.parse(params);
    };
    ```

---

#### **Step 3: Update the Trello Client**

1.  **File:** `src/trello-client.ts`
2.  **Action:** Add two new methods to the `TrelloClient` class.
3.  **Details:**
    *   **`getCardDescription(cardId: string)`:** This method will make a `GET` request to `/cards/{id}?fields=desc` and return the `desc` property from the response, or an empty string if it's null/undefined.
    *   **`appendToCardDescription(cardId: string, textToAppend: string)`:** This method orchestrates the logic. It first calls `getCardDescription`. It then constructs the new description string (e.g., `currentDesc + "\n\n" + textToAppend`). Finally, it calls the existing `updateCardDescription` method with the newly constructed string.

---

#### **Step 4: Create the New Tool**

1.  **File:** `src/index.ts`
2.  **Action:** Define and register the new `append_to_card_description` tool.
3.  **Details:**
    *   Set the `name` to `append_to_card_description`.
    *   Define the `parameters`, making `card_id` and `text_to_append` required.
    *   The `handler` should call the validation function, then call the `trelloClient.appendToCardDescription` method.
    *   Return a success message.

---

#### **Step 5: Verify Implementation**

1.  **Action:** Run the test suite.
2.  **Expected Outcome:** The tests from Step 1 should now pass.
3.  **Final Check:** Review the logic, especially the string concatenation in `appendToCardDescription`, to ensure it produces clean formatting.

```