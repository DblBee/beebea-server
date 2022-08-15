# Genetic Design

A chromosome is a set of 8 colors called genes. Each color is broken down into 4 color definitions. The color definition defines the color by hex and rgb. Each color has a unique trait name that is generated at birth. The generation 0 chromosomes will be based on a base color definition that is categorized by an element type (fire, water, earth, wind). The base color definitions can only be used once. When a water element chromosome is generated the base color can never be used again. The amount of base colors determine the population size for the specific element

- gene1
  - primaryColor
    - name
    - hex
    - rgb
    - type
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene2
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene3
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene4
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene5
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene6
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene7
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color
- gene8
  - primaryColor
  - secondary1Color
  - secondary2Color
  - secondary3Color

You can use this tool to generate a new pixel image for testing and reference [Pixel Art]([https://](https://www.pixilart.com/))

## Genetic DTOs

### CreateColorDefinitionDto

```typescript
class CreateColorDefinitionDto  {
 name:  string;
 hex:  string;
 rgb:  string;
 type:  ColorDefinitionType;
}
```

### CreateColorDto

```typescript
class CreateColorDto  {
 primaryColor:  CreateColorDefinitionDto;
 secondary1Color:  CreateColorDefinitionDto;
 secondary2Color:  CreateColorDefinitionDto;
 secondary3Color:  CreateColorDefinitionDto;
}
```

### CreateChromosomeDto

```typescript
class CreateChromosomeDto  {
 gene1:  CreateColorDto;
 gene2:  CreateColorDto;
 gene3:  CreateColorDto;
 gene4:  CreateColorDto;
 gene5:  CreateColorDto;
 gene6:  CreateColorDto;
 gene7:  CreateColorDto;
 gene8:  CreateColorDto;
}
```


## Chromosome Generator

The chromosome generator provider will create a new Chromosome dto with the correct color genes generated based on a base color and color definition type. These must be unique every time. There cannot be a clone of a chromosome in the system

```typescript
ChromosomeGenerator.generate(elementDefinitionType: ElementDefinitionType, baseColor:  string): CreateChromosomeDto
```
