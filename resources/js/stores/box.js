import { writable } from 'svelte/store';

export const boxes = writable([]);

export const addBox = box => {
    boxes.update($boxes => [...$boxes, box]);
};
export const removeBox = box => {
    boxes.update($boxes => $boxes.filter((b) => b !== box))
};
export const clearBoxes = () => {
    boxes.set([]);
};
// export const createBoxesStore = (initial) => {
//     const { subscribe, set, update} = writable(initial);
//
//     return {
//         subscribe,
//         addBox: box => {
//             update($boxes => [...$boxes, box]);
//         },
//         removeBox: box => {
//             update($boxes => $boxes.filter((b) => b !== box))
//         },
//         clearBoxes: () => {
//             set([]);
//         }
//     }
// }
// export const boxes = createBoxesStore();
