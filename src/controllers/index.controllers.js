import connection from "../database/database.js";

export async function getPassengers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;

    if (page <= 0) {
      return res.status(400).send("Invalid page value");
    }

    const { rows: passengers } = await connection.query(`
            SELECT p."fullName", COUNT(p) as "viagens"  from passengers p
                JOIN passenger_travels ON passenger_travels."passengerId" = p.id
                JOIN travels ON travels.id = passenger_travels."travelId"
                WHERE p."fullName" like '%Brooke%'
                GROUP BY p."fullName" 
                ORDER BY "viagens" DESC
                LIMIT 100;
        `);

    const result = passengers.map((pass) => ({
      passenger: pass.fullName,
      travels: pass.viagens,
    }));

    if (result.length > 100) {
      return res.status(500).send("Too many results");
    }

    const page1 = result.slice(0, 24);
    const page2 = result.slice(25, 49);
    const page3 = result.slice(50, 74);
    const page4 = result.slice(75, 99);

    if (page === 1) res.send(page1);
    else if (page === 2) res.send(page2);
    else if (page === 3) res.send(page3);
    else if (page === 4) res.send(page4);
    else if (page >= 5) res.status(500).send("Invalid page value");
    else res.send(result);
  } catch (err) {
    res.status(500).send({ err: "Internal Server Error" });
  }
}


