const { mergeSort, merge } = require('./notes');

jest.mock('./notes', () => {
    return {
        mergeSort: jest.fn(),
        merge: jest.fn(),
    };
});

describe('mergeSort function', () => {
    test('A função classifica uma série de objetos com base no prazo e na prioridade', () => {
        const unsortedArray = [
            { deadline: '2024-05-20', priority: 2 },
            { deadline: '2024-05-15', priority: 1 },
            { deadline: '2024-05-18', priority: 3 }
        ];

        mergeSort(unsortedArray);

        expect(mergeSort).toHaveBeenCalledWith(unsortedArray);
    });

    test('A função retorna um array vazio se a entrada estiver vazia', () => {
        mergeSort([]);

        expect(mergeSort).toHaveBeenCalledWith([]);
    });
});

describe('merge function', () => {
    test('A função mescla duas matrizes classificadas corretamente', () => {
        const left = [{ deadline: '2024-05-15', priority: 1 }];
        const right = [{ deadline: '2024-05-18', priority: 3 }];

        merge(left, right);

        expect(merge).toHaveBeenCalledWith(left, right);
    });

    test('A função retorna um array vazio se ambas as entradas estiverem vazias', () => {
        merge([], []);

        expect(merge).toHaveBeenCalledWith([], []);
    });
});
