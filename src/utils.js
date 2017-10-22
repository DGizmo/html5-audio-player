// Fisher-Yates algorithm
export function shuffleArray(a) {
    var i, t, j;
    for (i = a.length - 1; i > 0; i -= 1) {
        t = a[i];
        j = Math.floor(Math.random() * (i + 1));
        a[i] = a[j];
        a[j] = t;
    }
    return a;
}
