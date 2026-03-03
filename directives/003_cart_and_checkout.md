# Directive 003: Cart & Checkout Implementation

## Goal
Implement the multi-supplier checkout flow with MOQ enforcement and payment selection.

## Inputs
- `directives/project_blueprint.md`

## Steps
1. Create a `CartContext` or basic state to manage items across suppliers.
2. Implement the **Cart Slide-over** or Modal.
3. Build the **Checkout Page** with:
    - MOQ validation.
    - Delivery date selector.
    - Payment options (ACH, Net Terms).
    - Escrow trust badge.
4. Add "Add to Cart" functionality to the marketplace cards/table.

## Tools/Scripts
- Vite/React implementation.

## Outputs
- Fully functional multi-supplier cart and checkout process.
