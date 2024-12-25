import axios from "axios";

export const fetchAutoShirt = async (sc_id) =>
    {
        try {
            const res = await axios.get("/api/get_formID",
                {
                    params:{
                        id:sc_id
                    }
                }
            )
            return res.data[0].school_form
        } catch (error) {
            console.log(error)
        }
    }