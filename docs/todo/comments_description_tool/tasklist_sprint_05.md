### Task List: Sprint 5 - Card Label Viewing

**Objective:** Create a new tool, `get_card_labels`, to view the labels applied to a specific card.

**Methodology:** TDD. Write tests, implement the feature, and verify.

---

#### **Step 1: Write Failing Tests**

1.  **File:** `src/index.test.ts` (or a relevant test file)
2.  **Action:** Add test cases for the `get_card_labels` tool.
3.  **Details:**
    *   **Test Case 1 (Card with labels):** Mock `TrelloClient.getCardLabels` to return a sample array of label objects. Call the tool's handler with a `card_id`. Assert that the handler returns the correctly formatted list.
    *   **Test Case 2 (Card with no labels):** Mock `TrelloClient.getCardLabels` to return an empty array. Call the handler. Assert that the handler returns an empty array.
    *   These tests will fail initially.

---

#### **Step 2: Create the Validator**

1.  **File:** `src/validators.ts`
2.  **Action:** Add a new `zod` schema and validation function for the get card labels request.
3.  **Code Snippets:**
    ```typescript
    export const getCardLabelsRequestSchema = z.object({
      card_id: z.string(),
    });

    export const validateGetCardLabelsRequest = (params: any) => {
      return getCardLabelsRequestSchema.parse(params);
    };
    ```

---

#### **Step 3: Create the Trello Client Method**

1.  **File:** `src/trello-client.ts`
2.  **Action:** Add the `getCardLabels` method.
3.  **Details:**
    *   The method should accept a `cardId` string.
    *   It should make a `GET` request to `/cards/{cardId}?fields=labels`.
    *   It should return the `labels` array from the response, or an empty array `[]` if the property does not exist.

---

#### **Step 4: Create the New Tool**

1.  **File:** `src/index.ts`
2.  **Action:** Define and register the new `get_card_labels` tool.
3.  **Details:**
    *   Set the `name` to `get_card_labels`.
    *   Define the `parameters`, making `card_id` required.
    *   The `handler` should validate the parameters, then call `trelloClient.getCardLabels()`.
    *   On success, it should format and return the list of labels.

---

#### **Step 5: Verify Implementation**

1.  **Action:** Run the test suite.
2.  **Expected Outcome:** The tests from Step 1 should now pass.
3.  **Final Check:** Review the code for clarity and correctness.
