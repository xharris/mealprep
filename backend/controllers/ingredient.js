import { TBL } from '../names';

export const getIngredient = (_req, res, db) => {
    db
        .select('*').from(TBL.ingredients)
        .then(items => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

export const postIngredient = (req, res, db) => {
    const { name, img_url } = req.body
    const created = new Date()
    db(TBL.ingredients)
        .insert({ name, img_url, created })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}