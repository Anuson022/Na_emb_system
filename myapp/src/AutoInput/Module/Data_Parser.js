export const ParseShirtData = (parse_data) =>
{
    try {
        const school_shirt = JSON.parse(parse_data)
        return { school_shirt }
    } catch (error) {
        console.log(error);
    }
}