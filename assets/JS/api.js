export async function getProducts(BASE_URL) {
    try {
        const api = await fetch(BASE_URL);
        const res = await api.json();
        localStorage.setItem('products', JSON.stringify(res));
        return res;
    } catch (error) {
        console.error(error);
    }
}