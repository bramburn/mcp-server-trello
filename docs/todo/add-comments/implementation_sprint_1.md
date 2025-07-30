### Implementation Guidance: Sprint 1 - Fix Card Creation Description

This guide provides the technical details needed to fix the description functionality in the `add_card_to_list` tool.

#### 1. Trello API Reference

The primary Trello API endpoint for creating a card is `POST /1/cards`.

-   **Endpoint**: `POST /1/cards`
-   **Official Documentation**: [Trello API Documentation: Create Card](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-post)

**Key Parameters:**
-   `idList` (required): The ID of the list the card should be created in.
-   `name` (required): The name for the card.
-   `desc` (optional): The description for the card.

**Example Request:**
```bash
curl --request POST \
  --url 'https://api.trello.com/1/cards?idList=LIST_ID&name=My+New+Card&desc=This+is+the+description.&key=API_KEY&token=API_TOKEN' \
  --header 'Accept: application/json'
```

#### 2. Code Implementation Details

The implementation will touch three main files: `src/index.ts`, `src/trello-client.ts`, and `src/validators.ts`.

**File: `src/validators.ts`**

The `zod` schema for the `add_card_to_list` tool needs to be updated to include the optional `description` field.

```typescript
// src/validators.ts

import { z } from 'zod';

// ... other validators

export const addCardRequestSchema = z.object({
  list_id: z.string(),
  name: z.string(),
  description: z.string().optional(), // Add this line
});

export const validateAddCardRequest = (params: any) => {
  return addCardRequestSchema.parse(params);
};
```

**File: `src/trello-client.ts`**

The `addCard` method in the `TrelloClient` class must be updated to handle the new `description` parameter and pass it to the API as `desc`.

```typescript
// src/trello-client.ts

// ... other methods

  async addCard(listId: string, name: string, description?: string): Promise<any> {
    const params: { idList: string; name: string; desc?: string } = {
      idList: listId,
      name: name,
    };

    if (description) {
      params.desc = description;
    }

    return this.post('/cards', params);
  }

// ...
```

**File: `src/index.ts`**

Finally, update the tool definition in `src/index.ts` to include the `description` in its parameters and pass the value from the tool call to the `trelloClient`.

```typescript
// src/index.ts

// ... in the tools array

{
  type: 'function',
  function: {
    name: 'add_card_to_list',
    description: 'Adds a new card to a specified list on the Trello board.',
    parameters: {
      type: 'object',
      properties: {
        list_id: {
          type: 'string',
          description: 'The ID of the list to add the card to.',
        },
        name: {
          type: 'string',
          description: 'The name of the card to create.',
        },
        description: { // Add this parameter
          type: 'string',
          description: 'An optional description for the card.',
        },
      },
      required: ['list_id', 'name'],
    },
    // ... handler function
    handler: async (params: any) => {
      try {
        const { list_id, name, description } = validateAddCardRequest(params);
        const card = await trelloClient.addCard(list_id, name, description);
        return { success: true, card: card };
      } catch (error) {
        // ... error handling
      }
    },
  },
}
```

By following these steps, the `add_card_to_list` tool will be correctly updated to support card descriptions, aligning with the requirements of Sprint 1.