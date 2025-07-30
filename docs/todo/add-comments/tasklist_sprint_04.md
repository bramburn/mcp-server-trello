### Task List: Sprint 4 - Delete Comment

**Objective:** Create a `delete_card_comment` tool that allows users to delete their own comments on a Trello card.

**Methodology:** Test-Driven Development (TDD)

---

#### **Part 1: Trello Client Method (`deleteCardComment`)**

1.  **Write Failing Test for `deleteCardComment`:**
    *   **Action:** Add a new test case to `src/tests/trello-client.test.ts` for the `deleteCardComment` method.
    *   **Filepath:** `src/tests/trello-client.test.ts`
    *   **Details:** Mock the `axios.delete` call. The test should verify that the method is called with the correct `commentId`. It should also test for permission errors (e.g., a 401 response).

2.  **Implement `deleteCardComment` Method:**
    *   **Action:** Add the `deleteCardComment` method to the `TrelloClient` class.
    *   **Filepath:** `src/trello-client.ts`
    *   **Implementation:**
        ```typescript
        async deleteCardComment(commentId: string): Promise<any> {
          try {
            const response = await this.axios.delete(`/actions/${commentId}`);
            return response.data;
          } catch (error) {
            if (error.response && error.response.status === 401) {
              throw new Error('Permission denied. You can only delete your own comments.');
            }
            if (error.response && error.response.status === 404) {
              throw new Error(`Comment with ID '${commentId}' not found.`);
            }
            console.error('Error deleting comment in Trello:', error.message);
            throw new Error('Failed to delete card comment.');
          }
        }
        ```

3.  **Run Tests:**
    *   **Action:** Execute the test suite.
    *   **Expected Result:** The test for `deleteCardComment` should now pass.

---

#### **Part 2: MCP Tool (`delete_card_comment`)**

4.  **Write Failing Test for the Tool:**
    *   **Action:** Add a new test case to `src/tests/index.test.ts` for the `delete_card_comment` tool.
    *   **Filepath:** `src/tests/index.test.ts`
    *   **Details:** The test should simulate calling the tool with a `comment_id`. It should assert that the tool returns a success status.

5.  **Implement `delete_card_comment` Tool:**
    *   **Action:** Add the new tool definition to the tools array in `index.ts`.
    *   **Filepath:** `src/index.ts`
    *   **Implementation:**
        ```typescript
        {
          name: 'delete_card_comment',
          description: 'Delete a comment on a Trello card.',
          input_schema: {
            type: 'object',
            properties: {
              comment_id: { type: 'string', description: 'The ID of the comment to delete.' },
            },
            required: ['comment_id'],
          },
          function: async ({ comment_id }: { comment_id: string }) => {
            try {
              await trelloClient.deleteCardComment(comment_id);
              return { success: true, message: 'Comment deleted successfully.' };
            } catch (error) {
              return { error: error.message };
            }
          },
        },
        ```

6.  **Run Final Tests:**
    *   **Action:** Execute the full test suite.
    *   **Expected Result:** All tests, including the new tool test, should pass.
