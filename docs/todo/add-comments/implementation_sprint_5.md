### Implementation Guidance: Sprint 5 - Card Label Viewing

This guide provides the technical details for creating the `get_card_labels` tool.

#### 1. Trello API Reference

The endpoint for getting information about a card is `GET /1/cards/{id}`. We can use the `fields` parameter to specify that we only want the `labels` field.

-   **Endpoint**: `GET /1/cards/{id}`
-   **Official Documentation**: [Trello API Documentation: Get Card](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-get)

**Key Parameters:**
-   `id` (required, in path): The ID of the card.
-   `fields` (optional): A comma-separated list of fields to return. For this tool, we will use `labels`.

**Example Request:**
```bash
curl --request GET \
  --url 'https://api.trello.com/1/cards/CARD_ID?fields=labels&key=API_KEY&token=API_TOKEN' \
  --header 'Accept: application/json'
```

The API returns a card object containing a `labels` array.

#### 2. Code Implementation Details

**File: `src/validators.ts`**

Add a `zod` schema for the `get_card_labels` request.

```typescript
// src/validators.ts

import { z } from 'zod';

// ... other validators

export const getCardLabelsRequestSchema = z.object({
  card_id: z.string(),
});

export const validateGetCardLabelsRequest = (params: any) => {
  return getCardLabelsRequestSchema.parse(params);
};
```

**File: `src/trello-client.ts`**

Add a method to the `TrelloClient` to fetch the labels for a specific card.

```typescript
// src/trello-client.ts

// ... other methods

  async getCardLabels(cardId: string): Promise<any[]> {
    try {
      // The 'labels' field contains an array of label objects
      const card = await this.get(`/cards/${cardId}?fields=labels`);
      return card.labels || []; // Return the labels array, or an empty array if it doesn't exist
    } catch (error) {
      console.error(`Error fetching labels for card ${cardId}:`, error);
      throw error; // Re-throw the error to be handled by the tool
    }
  }

// ...
```

**File: `src/index.ts`**

Add the new `get_card_labels` tool.

```typescript
// src/index.ts
import {
  // ...
  validateGetCardLabelsRequest,
} from './validators';

// ... in the tools array

{
  type: 'function',
  function: {
    name: 'get_card_labels',
    description: 'Retrieves all labels currently applied to a specific card.',
    parameters: {
      type: 'object',
      properties: {
        card_id: {
          type: 'string',
          description: 'The ID of the card to get the labels from.',
        },
      },
      required: ['card_id'],
    },
    handler: async (params: any) => {
      try {
        const { card_id } = validateGetCardLabelsRequest(params);
        const labels = await trelloClient.getCardLabels(card_id);
        const formattedLabels = labels.map(label => ({
          id: label.id,
          name: label.name,
          color: label.color,
        }));
        return { success: true, labels: formattedLabels };
      } catch (error) {
        // ... error handling
      }
    },
  },
}
```
This completes the implementation for Sprint 5.
