// Geometría vectorial auténtica de la «g» — Manrope wght≈560.
// Interpolación lineal t=0.6 entre instancias estáticas 500 y 600
// (misma estructura de comandos/puntos; avar identidad en Manrope).
// Sistema: upm 2000, origen x = borde izquierdo de la caja de avance,
// y = 0 en baseline, Y-DOWN (coordenadas de pantalla/SVG directas).
// Hallazgo tipográfico: la «g» de Manrope posee UN ÚNICO contorno
// interior cerrado (contraforma del ojo superior); el bucle inferior es
// abierto. No hay ambigüedad de portal.
export const G_UPM = 2000;
export const G_ADVANCE = 1209.6;
export const G_CONTOURS: string[] = [
  'M581.8 510L581.8 510Q495.6 510 414.3 483.4Q333 456.8 265.8 404.3Q198.6 351.8 154.2 273.6L154.2 273.6L335.2 180.4Q372.2 253.4 440.6 287Q509 320.6 583.4 320.6L583.4 320.6Q678 320.6 743 286.7Q808 252.8 840.5 185.4Q873 118 872 18.2L872 18.2L872 -281L895.4 -281L895.4 -1080L1069.6 -1080L1069.6 20.2Q1069.6 63.6 1066.8 103.4Q1064 143.2 1056 182.6L1056 182.6Q1033.8 294 970.3 366.4Q906.8 438.8 807.9 474.4Q709 510 581.8 510Z',
  'M567 30L567 30Q416 30 307.1 -45.2Q198.2 -120.4 139.1 -249.7Q80 -379 80 -541L80 -541Q80 -703.6 139.4 -832.3Q198.8 -961 308.3 -1035.5Q417.8 -1110 569 -1110L569 -1110Q722 -1110 826.3 -1035.7Q930.6 -961.4 984.1 -832.4Q1037.6 -703.4 1037.6 -541L1037.6 -541Q1037.6 -379.4 983.8 -250.2Q930 -121 825.4 -45.5Q720.8 30 567 30Z',
  'M593.2 -148.6L593.2 -148.6Q698.6 -148.6 765.6 -199Q832.6 -249.4 864 -338Q895.4 -426.6 895.4 -541L895.4 -541Q895.4 -656.2 863.7 -744.4Q832 -832.6 766.3 -882Q700.6 -931.4 599.4 -931.4L599.4 -931.4Q493 -931.4 424.2 -879.2Q355.4 -827 322.1 -738.6Q288.8 -650.2 288.8 -541L288.8 -541Q288.8 -430.8 322.3 -341.9Q355.8 -253 423.3 -200.8Q490.8 -148.6 593.2 -148.6Z',
];
export const G_COUNTER_INDEX = 2;
export const G_COUNTER_CENTER = { x: 593.7, y: -540.2 } as const; // rel. a (avance-izq, baseline), y-down
export const G_COUNTER_BBOX = [288.8, -931.4, 895.4, -148.6] as const; // [x1,y1,x2,y2]
export const G_COUNTER_AREA = -388881;
