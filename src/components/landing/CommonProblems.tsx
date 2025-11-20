import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const problems = [
  { title: "Luz prende, no calienta", description: "La falla más común, y la buena noticia es que tiene una solución rápida. Contáctenos y le daremos un presupuesto estimado.", linkText: "Hola! Mi calefón prende pero no calienta" },
  { title: "No prende, ni calienta", description: "Indica un problema de seguridad interno que solo un técnico calificado debe diagnosticar. Contáctenos para conocer la solución de forma segura.", linkText: "Hola! Mi calefón no prende" },
  { title: "Hace saltar la llave", description: "Una alerta de seguridad crítica, señal de un cortocircuito. No intente solucionarlo. Llámenos para una reparación definitiva y segura.", linkText: "Hola! Mi calefón hace saltar la llave" },
  { title: "El calefón pierde agua", description: "Un goteo es una advertencia de riesgo, pero la solución suele ser más simple de lo que imagina. Contáctenos para un presupuesto estimado.", linkText: "Hola! Mi calefón pierde agua" },
];

export const CommonProblems = () => (
  <section id="problems" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-2">Arreglo de calefones en Montevideo</h2>
      <div className="w-24 h-1 bg-[#0a4a8e] mx-auto mb-12"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {problems.map((problem, index) => (
          <Card key={index} className="flex flex-col text-center">
            <CardHeader>
              <CardTitle>{problem.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-gray-600 flex-grow">{problem.description}</p>
              <Button asChild className="mt-4 bg-[#0a4a8e] hover:bg-[#083b71] w-full">
                <a href={`https://wa.me/59896758200?text=${encodeURIComponent(problem.linkText)}`}>
                  Solicitar Presupuesto
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);