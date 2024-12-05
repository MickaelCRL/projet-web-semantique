export const fetchDataFromRepository = async (): Promise<RepositorieData[]> => {
  try {
    const query = `
        PREFIX cerammi: <https://cours.iut-orsay.fr/npbd/projet/cerammi#>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        SELECT ?NomSite ?NomPays ?EtatSite ?TypeSite ?IDH WHERE {
        ?Site a cerammi:Site;
                  cerammi:nom ?NomSite;
                  cerammi:etat ?EtatSite;
                cerammi:appartientAuPays ?Pays;
                cerammi:type ?TypeSite.
            ?Pays a cerammi:Pays;
                  cerammi:nom ?NomPays.
                  
            SERVICE <https://query.wikidata.org/sparql> {
                ?WikidataPays rdfs:label ?NomPays.  
                FILTER(LANG(?NomPays) = "fr")       
                ?WikidataPays wdt:P1081 ?IDH.      
            }
        }
        ORDER BY ?IDH
        LIMIT 100
      `;
    const endpoint = "http://localhost:7200/repositories/CERAMMI";
    const response = await fetch(
      endpoint + "?query=" + encodeURIComponent(query),
      {
        headers: {
          Accept: "application/sparql-results+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    const formattedData: RepositorieData[] = json.results.bindings.map(
      (item: any) => ({
        site: item.NomSite.value,
        pays: item.NomPays.value,
        etat: item.EtatSite.value,
        idh: parseFloat(item.IDH.value),
      })
    );

    return formattedData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
};
