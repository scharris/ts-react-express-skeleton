import {ModGroupSpec} from './specs-serializer/spec-types';

const modGroupSpec: ModGroupSpec = {
   defaultSchema: 'drugs',
   generateUnqualifiedNamesForSchemas: ['drugs'],
   modificationStatementSpecs: [
      {
         statementName: "drug insert",
         command: "INSERT",
         table: "drug",
         targetFields: [
            {
               field: "id",
               value: ":id"
            },
            {
               field: "name",
               value: ":namePrefix || ':' || :nameSuffix",
               paramNames: [
                  "namePrefix",
                  "nameSuffix"
               ]
            },
            {
               field: "compound_id",
               value: "2 - 1"
            },
            {
               field: "mesh_id",
               value: ":meshId"
            },
            {
               field: "registered_by",
               value: ":registeredBy"
            }
         ]
      },
      {
         statementName: "drug update",
         command: "UPDATE",
         table: "drug",
         tableAlias: "d",
         targetFields: [
            {
               field: "name",
               value: ":namePartOne || '-' || :namePartTwo",
               paramNames: [
                  "namePartOne",
                  "namePartTwo"
               ]
            },
            {
               field: "compound_id",
               value: ":compoundId"
            },
            {
               field: "mesh_id",
               value: ":meshId"
            }
         ],
         fieldParamConditions: [
            {
               field: "cid"
            },
            {
               field: "mesh_id",
               paramName: "oldMeshId"
            }
         ],
         recordCondition: {
            sql: "$$.compound_id < 0"
         }
      },
      {
         statementName: "drug delete",
         command: "DELETE",
         table: "drug",
         fieldParamConditions: [
            {
               field: "cid"
            }
         ]
      },
      {
         statementName: "lesser drugs delete",
         command: "DELETE",
         table: "drug",
         fieldParamConditions: [
            {
               field: "cid",
               op: "LT"
            }
         ]
      },
      {
         statementName: "drugs list delete",
         command: "DELETE",
         table: "drug",
         fieldParamConditions: [
            {
               field: "cid",
               op: "IN"
            }
         ]
      }
   ]
}

export default modGroupSpec;
