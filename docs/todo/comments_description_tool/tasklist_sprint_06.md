### Task List: Sprint 6 - Add Labels to Card

**Objective:** Create a new tool, `add_labels_to_card`, to attach one or more existing labels to a card.

**Methodology:** TDD. Write tests, implement the feature, and verify.

---

#### **Step 1: Write Failing Tests**

1.  **File:** `src/index.test.ts` (or a relevant test file)
2.  **Action:** Add test cases for the `add_labels_to_card` tool.
3.  **Details:**
    *   **Test Case 1 (Add single label):** Mock `TrelloClient.addLabelsToCard`. Call the handler with a `card_id` and an array containing a single `label_id`. Assert the mock was called correctly.
    *   **Test Case 2 (Add multiple labels):** Mock `TrelloClient.addLabelsToCard`. Call the handler with a `card_id` and an array of multiple `label_ids`. Assert the mock was called with all of them.
    *   These tests will fail initially.

---

#### **Step 2: Create the Validator**

1.  **File:** `src/validators.ts`
2.  **Action:** Add a new `zod` schema and validation function.
3.  **Code Snippets:**
    ```typescript
    export const addLabelsToCardRequestSchema = z.object({
      card_id: z.string(),
      label_ids: z.array(z.string()).min(1), // Ensure at least one label ID is provided
    });

    export const validateAddLabelsToCardRequest = (params: any) => {
      return addLabelsToCardRequestSchema.parse(params);
    };
    ```

---

#### **Step 3: Create the Trello Client Method**

1.  **File:** `src/trello-client.ts`
2.  **Action:** Add the `addLabelsToCard` method.
3.  **Details:**
    *   The method should accept `cardId` (string) and `labelIds` (array of strings).
    *   It should make a `POST` request to the `/cards/{cardId}/idLabels` endpoint.
    *   The `value` parameter in the request body should be a comma-separated string of the `labelIds` (e.g., `labelIds.join(',')`).

---

#### **Step 4: Create the New Tool**

1.  **File:** `src/index.ts`
2.  **Action:** Define and register the new `add_labels_to_card` tool.
3.  **Details:**
    *   Set the `name` to `add_labels_to_card`.
    *   Define the `parameters`, making `card_id` and `label_ids` (as an array of strings) required.
    *   The `handler` should validate parameters, then call `trelloClient.addLabelsToCard()`.
    *   Return the result from the Trello client on success.

---

#### **Step 5: Verify Implementation**

1.  **Action:** Run the test suite.
2.  **Expected Outcome:** The tests from Step 1 should now pass.
3.  **Final Check:** Double-check that the `label_ids` array is correctly converted to a comma-separated string before being sent to the Trello API.
