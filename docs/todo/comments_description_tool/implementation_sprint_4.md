### Implementation Guidance: Sprint 4 - Board Label Listing

This guide provides the technical details for creating the `get_board_labels` tool.

#### 1. Trello API Reference

The endpoint for getting labels on a board is `GET /1/boards/{id}/labels`.

-   **Endpoint**: `GET /1/boards/{id}/labels`
-   **Official Documentation**: [Trello API Documentation: Get Board Labels](https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-labels-get)

**Key Parameters:**
-   `id` (required, in path): The ID of the board.

**Example Request:**
```bash
curl --request GET \
  --url 'https://api.trello.com/1/boards/BOARD_ID/labels?key=API_KEY&token=API_TOKEN' \
  --header 'Accept: application/json'
```

The API returns an array of label objects.

#### 2. Code Implementation Details

**File: `src/trello-client.ts`**

Add a method to the `TrelloClient` to fetch the labels for the currently configured board.

```typescript
// src/trello-client.ts

// ... other properties
  private boardId: string | null = null; // Ensure this is part of the class

// ... other methods

  setBoardId(boardId: string) { // Ensure this method exists
    this.boardId = boardId;
  }

  async getBoardLabels(): Promise<any[]> {
    if (!this.boardId) {
      throw new Error('No active Trello board has been set. Please set a board first.');
    }
    return this.get(`/boards/${this.boardId}/labels`);
  }

// ...
```

**File: `src/index.ts`**

Add the new `get_board_labels` tool. This tool has no parameters.

```typescript
// src/index.ts

// ... in the tools array

{
  type: 'function',
  function: {
    name: 'get_board_labels',
    description: 'Retrieves a list of all labels available on the currently active Trello board.',
    parameters: { type: 'object', properties: {}, required: [] }, // No parameters needed
    handler: async () => {
      try {
        const labels = await trelloClient.getBoardLabels();
        // We map the result to ensure a clean, consistent output for the user
        const formattedLabels = labels.map(label => ({
          id: label.id,
          name: label.name,
          color: label.color,
        }));
        return { success: true, labels: formattedLabels };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: errorMessage };
      }
    },
  },
}
```
This completes the implementation for Sprint 4.