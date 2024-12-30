import queries from '../model/queries'

async function getCategories(req,res) {
    const categories = await queries.getCategories();
    

}