### Task List: Sprint 4 - Board Label Listing

**Objective:** Create a new tool, `get_board_labels`, to list all available labels on the active board.

**Methodology:** TDD. Write tests covering all scenarios, implement the tool, and confirm tests pass.

---

#### **Step 1: Write Failing Tests**

1.  **File:** `src/index.test.ts` (or a relevant test file)
2.  **Action:** Add test cases for the `get_board_labels` tool.
3.  **Details:**
    *   **Test Case 1 (Success):** Mock `TrelloClient.getBoardLabels` to return a sample array of label objects. Call the tool's handler. Assert that the handler returns the correctly formatted list of labels.
    *   **Test Case 2 (No Active Board):** Mock `TrelloClient.getBoardLabels` to throw an error (e.g., "No active board"). Call the handler. Assert that the handler catches the error and returns a meaningful error message.
    *   These tests will fail as the tool does not yet exist.

---

#### **Step 2: Create the Trello Client Method**

1.  **File:** `src/trello-client.ts`
2.  **Action:** Add the `getBoardLabels` method.
3.  **Details:**
    *   The method should first check if `this.boardId` is set. If not, it should throw an error.
    *   If a `boardId` exists, it should make a `GET` request to the `/boards/{this.boardId}/labels` endpoint and return the result.

---

#### **Step 3: Create the New Tool**

1.  **File:** `src/index.ts`
2.  **Action:** Define and register the new `get_board_labels` tool.
3.  **Details:**
    *   Set the `name` to `get_board_labels`.
    *   This tool requires no parameters, so the `parameters` object can be empty (`{ type: 'object', properties: {}, required: [] }`).
    *   The `handler` should call `trelloClient.getBoardLabels()`.
    *   On success, it should format the returned labels into a clean array of objects (e.g., with `id`, `name`, `color`) and return it.
    *   It must include a `try...catch` block to handle the error thrown when no board is active.

---

#### **Step 4: Verify Implementation**

1.  **Action:** Run the test suite.
2.  **Expected Outcome:** The tests from Step 1 should now pass.
3.  **Final Check:** Ensure the error handling is robust and provides a clear message to the user when no board is set.
