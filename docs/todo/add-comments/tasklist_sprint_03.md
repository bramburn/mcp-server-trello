### Task List: Sprint 3 - Edit Comment

**Objective:** Create an `edit_card_comment` tool that allows users to edit their own comments on a Trello card.

**Methodology:** Test-Driven Development (TDD)

---

#### **Part 1: Trello Client Method (`editCardComment`)**

1.  **Write Failing Test for `editCardComment`:**
    *   **Action:** Add a new test case to `src/tests/trello-client.test.ts` for the `editCardComment` method.
    *   **Filepath:** `src/tests/trello-client.test.ts`
    *   **Details:** Mock the `axios.put` call. The test should verify that the method is called with the correct `commentId` and new `text`. It should also test for permission errors (e.g., a 401 response).

2.  **Implement `editCardComment` Method:**
    *   **Action:** Add the `editCardComment` method to the `TrelloClient` class.
    *   **Filepath:** `src/trello-client.ts`
    *   **Implementation:**
        ```typescript
        async editCardComment(commentId: string, text: string): Promise<any> {
          try {
            const response = await this.axios.put(`/actions/${commentId}`, null, {
              params: { text },
            });
            return response.data;
          } catch (error) {
            if (error.response && error.response.status === 401) {
              throw new Error('Permission denied. You can only edit your own comments.');
            }
            if (error.response && error.response.status === 404) {
              throw new Error(`Comment with ID '${commentId}' not found.`);
            }
            console.error('Error editing comment in Trello:', error.message);
            throw new Error('Failed to edit card comment.');
          }
        }
        ```

3.  **Run Tests:**
    *   **Action:** Execute the test suite.
    *   **Expected Result:** The test for `editCardComment` should now pass.

---

#### **Part 2: MCP Tool (`edit_card_comment`)**

4.  **Write Failing Test for the Tool:**
    *   **Action:** Add a new test case to `src/tests/index.test.ts` for the `edit_card_comment` tool.
    *   **Filepath:** `src/tests/index.test.ts`
    *   **Details:** The test should simulate calling the tool with a `comment_id` and `comment_text`. It should assert that the tool returns a success status.

5.  **Implement `edit_card_comment` Tool:**
    *   **Action:** Add the new tool definition to the tools array in `index.ts`.
    *   **Filepath:** `src/index.ts`
    *   **Implementation:**
        ```typescript
        {
          name: 'edit_card_comment',
          description: 'Edit a comment on a Trello card.',
          input_schema: {
            type: 'object',
            properties: {
              comment_id: { type: 'string', description: 'The ID of the comment to edit.' },
              comment_text: { type: 'string', description: 'The new text for the comment.' },
            },
            required: ['comment_id', 'comment_text'],
          },
          function: async ({ comment_id, comment_text }: { comment_id: string; comment_text: string }) => {
            try {
              await trelloClient.editCardComment(comment_id, comment_text);
              return { success: true, message: 'Comment updated successfully.' };
            } catch (error) {
              return { error: error.message };
            }
          },
        },
        ```

6.  **Run Final Tests:**
    *   **Action:** Execute the full test suite.
    *   **Expected Result:** All tests, including the new tool test, should pass.
