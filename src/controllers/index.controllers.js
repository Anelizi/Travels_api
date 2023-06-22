import connection from "../database/database.js";

export async function getPassengers(req, res){

    try {
        const page = parseInt(req.query.page) || 1;
        console.log(page);

        if(page <= 0){
            return res.status(400).send('Invalid page value');
        }
        
        const { rows: passengers } = await connection.query(`
            SELECT p."fullName", COUNT(p) as "viagens"  from passengers p
                JOIN passenger_travels ON passenger_travels."passengerId" = p.id
                JOIN travels ON travels.id = passenger_travels."travelId"
                WHERE p."fullName" like '%Brooke%'
                GROUP BY p."fullName" 
                ORDER BY "viagens" DESC
                LIMIT 100;
        `)
        

        const result = passengers.map((pass) => (
                {
                    passenger: pass.fullName,
                    travels: pass.viagens
                }
        ))

        if (result.length > 100){
            return res.status(500).send('Too many results')
        }
        
        const page1 = result.slice[0,24];
        console.log(page1)
        const page2 = result.slice[25,49]; 
        const page3 = result.slice[50,74]; 
        const page4 = result.slice[75,99]; 
        
        if(page===1) return res.send(page1);
        else if(page===2) return res.send(page2);
        else if(page===3) return res.send(page3);
        else if(page===4) return res.send(page4);

        
    /* const resultsPerPage = 25;
    const startIndex = (page - 1) * resultsPerPage;

    // Construir a query com base nos parâmetros fornecidos
    let query = `
      SELECT p."fullName", COUNT(p) as "viagens"
      FROM passengers AS p
      JOIN passenger_travels ON passenger_travels."passengerId" = p.id
      JOIN travels ON travels.id = passenger_travels."travelId"
      GROUP BY p."fullName"
      ORDER BY "viagens" DESC
      LIMIT ${resultsPerPage}
      OFFSET ${startIndex}
    `;
    const name = req.query.name;
    const resultsPage = await connection.query(query)
    if(name){
        query =`
        SELECT p."fullName", COUNT(p) as "viagens"
        FROM passengers AS p
        JOIN passenger_travels ON passenger_travels."passengerId" = p.id
        JOIN travels ON travels.id = passenger_travels."travelId"
        WHERE p."fullName" ILIKE '%' || $1 || '%'
        GROUP BY p."fullName"
        ORDER BY "viagens" DESC
        LIMIT ${resultsPerPage}
        OFFSET ${startIndex}
    `;

    const resultsPage = await connection(query, [name])
    res.send(resultsPage)
    }else(
        const resultsPage = await connection(query)
        res.send(resultsPage);
    ) */

        res.send(result)
    } catch (err) {
        res.status(500).send({ err: 'Internal Server Error' })
    }
    

}



