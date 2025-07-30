### Implementation Guidance: Sprint 6 - Add Labels to Card

This guide provides the technical details for creating the `add_labels_to_card` tool.

#### 1. Trello API Reference

The endpoint for adding labels to a card is `POST /1/cards/{id}/idLabels`.

-   **Endpoint**: `POST /1/cards/{id}/idLabels`
-   **Official Documentation**: [Trello API Documentation: Add Label to Card](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-idlabels-post)

**Key Parameters:**
-   `id` (required, in path): The ID of the card.
-   `value` (required, in body): The ID of the label to add. Although the documentation shows adding one at a time, this endpoint can accept a comma-separated string of label IDs to add multiple labels in one call.

**Example Request (Single Label):**
```bash
curl --request POST \
  --url 'https://api.trello.com/1/cards/CARD_ID/idLabels?value=LABEL_ID&key=API_KEY&token=API_TOKEN' \
  --header 'Accept: application/json'
```

**Note on Multiple Labels:** While not explicitly documented on the main page, the `idLabels` endpoint is commonly used by passing a comma-separated list to the `value` parameter to add multiple labels at once. This is more efficient than multiple API calls.

#### 2. Code Implementation Details

**File: `src/validators.ts`**

Add a `zod` schema for the `add_labels_to_card` request.

```typescript
// src/validators.ts

import { z } from 'zod';

// ... other validators

export const addLabelsToCardRequestSchema = z.object({
  card_id: z.string(),
  label_ids: z.array(z.string()).min(1, { message: "You must provide at least one label ID." }),
});

export const validateAddLabelsToCardRequest = (params: any) => {
  return addLabelsToCardRequestSchema.parse(params);
};
```

**File: `src/trello-client.ts`**

Add a method to the `TrelloClient` to handle adding labels.

```typescript
// src/trello-client.ts

// ... other methods

  async addLabelsToCard(cardId: string, labelIds: string[]): Promise<any> {
    // The API expects a single string of comma-separated IDs in the 'value' parameter.
    const value = labelIds.join(',');
    // Note: The endpoint is `/idLabels`, not a query parameter.
    return this.post(`/cards/${cardId}/idLabels`, { value });
  }

// ...
```

**File: `src/index.ts`**

Add the new `add_labels_to_card` tool.

```typescript
// src/index.ts
import {
  // ...
  validateAddLabelsToCardRequest,
} from './validators';

// ... in the tools array

{
  type: 'function',
  function: {
    name: 'add_labels_to_card',
    description: 'Adds one or more existing labels to a specific card.',
    parameters: {
      type: 'object',
      properties: {
        card_id: {
          type: 'string',
          description: 'The ID of the card to add the labels to.',
        },
        label_ids: {
          type: 'array',
          items: { 
            type: 'string',
            description: 'The ID of a label to add.'
          },
          description: 'An array of one or more label IDs to add to the card.',
        },
      },
      required: ['card_id', 'label_ids'],
    },
    handler: async (params: any) => {
      try {
        const { card_id, label_ids } = validateAddLabelsToCardRequest(params);
        const result = await trelloClient.addLabelsToCard(card_id, label_ids);
        return { success: true, labels_added: result };
      } catch (error) {
        // ... error handling
      }
    },
  },
}
```
This completes the implementation for Sprint 6 and all phases of the PRD.
