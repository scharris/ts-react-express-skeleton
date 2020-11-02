import {QueryGroupSpec} from './specs-serializer/spec-types';

const queryGroupSpec: QueryGroupSpec = {
   defaultSchema: "drugs",
   generateUnqualifiedNamesForSchemas: ["drugs"],
   outputFieldNameDefault: "CAMELCASE",
   querySpecs: [
      {
         queryName: "drugs query",
         resultsRepresentations: ["JSON_OBJECT_ROWS"],
         generateResultTypes: true,
         tableJson: {
            table: "drug",
            fieldExpressions: [
               { field: "name" },
               { field: "mesh_id" },
               { field: "cid", generatedFieldType: "number | null" },
               { field: "registered" },
               { field: "market_entry_date" },
               { field: "therapeutic_indications" },
               { expression: "$$.cid + 1000", jsonProperty: "cidPlus1000", generatedFieldType: "number | null" }
            ],
            childTableCollections: [
               {
                  collectionName: "references",
                  tableJson: {
                     table: "drug_reference",
                     inlineParentTables: [
                        {
                           tableJson: {
                              table: "reference",
                              fieldExpressions: [
                                 { field: "publication" }
                              ]
                           }
                        }
                     ]
                  }
               },
               {
                  collectionName: "brands",
                  tableJson: {
                     table: "brand",
                     fieldExpressions: [
                        { field: "brand_name" }
                     ],
                     inlineParentTables: [
                        {
                           tableJson: {
                              table: "manufacturer",
                              fieldExpressions: [
                                 { field: "name", jsonProperty: "manufacturer" }
                              ]
                           }
                        }
                     ]
                  }
               },
               {
                  collectionName: "advisories",
                  tableJson: {
                     table: "advisory",
                     fieldExpressions: [
                        { field: "text", jsonProperty: "advisoryText" }
                     ],
                     inlineParentTables: [
                        {
                           tableJson: {
                              table: "advisory_type",
                              fieldExpressions: [
                                 { field: "name", jsonProperty: "advisoryType" },
                                 { expression: "(1 + 1)", jsonProperty: "exprYieldingTwo", generatedFieldType: "number" }
                              ],
                              inlineParentTables: [
                                 {
                                    tableJson: {
                                       table: "authority",
                                       fieldExpressions: [
                                          { field: "name", jsonProperty: "authorityName" },
                                          { field: "url", jsonProperty: "authorityUrl" },
                                          { field: "description", jsonProperty: "authorityDescription" }
                                       ]
                                    }
                                 }
                              ]
                           }
                        }
                     ]
                  }
               },
               {
                  collectionName: "functionalCategories",
                  tableJson: {
                     table: "drug_functional_category",
                     inlineParentTables: [
                        {
                           tableJson: {
                              table: "functional_category",
                              fieldExpressions: [
                                 { field: "name", jsonProperty: "categoryName" },
                                 { field: "description" }
                              ]
                           }
                        },
                        {
                           tableJson: {
                              table: "authority",
                              fieldExpressions: [
                                 { field: "name", jsonProperty: "authorityName" },
                                 { field: "url", jsonProperty: "authorityUrl" },
                                 { field: "description", jsonProperty: "authorityDescription" }
                              ]
                           }
                        }
                     ]
                  }
               }
            ],
            referencedParentTables: [
               {
                  referenceName: "registeredByAnalyst",
                  tableJson: {
                     table: "analyst",
                     fieldExpressions: [
                        { field: "id" },
                        { field: "short_name" }
                     ]
                  }
               },
               {
                  referenceName: "compound",
                  viaForeignKeyFields: [
                     "compound_id"
                  ],
                  tableJson: {
                     table: "compound",
                     fieldExpressions: [
                        { field: "display_name" },
                        { field: "nctr_isis_id" },
                        { field: "cas" },
                        { field: "entered" }
                     ],
                     referencedParentTables: [
                        {
                           referenceName: "enteredByAnalyst",
                           tableJson: {
                              table: "analyst",
                              fieldExpressions: [
                                 { field: "id" },
                                 { field: "short_name" }
                              ]
                           }
                        }
                     ]
                  }
               }
            ],
            fieldParamConditions: [
               {
                  field: "mesh_id",
                  op: "IN"
               }
            ],
            recordCondition: {
               sql: "not $$.id = 2"
            }
         }
      }
   ]
};

export default queryGroupSpec;
