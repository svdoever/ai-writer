The **car-description** recipe is a very simple recipe that enables you to write a description of a car.

This recipe is to show-case the following features of the AI Writer Assistant:

- Define the available CLI parameters supported by the **car-description** recipe 
- Define a powerful prompt template that can use parameter values and functions to generate the description
- Define custom JavaScript functions in the `functions.js` file that can be used in the prompt template
- The use of functions in the `functions.js` file that are defined in other JavaScript files, e.g. `util.js`

## Example output

Given the command:

```
npm run ai-writer -- car-description --name "Citroen C6" --type "Diesel" --range "950" --output "Citroen C6"  --verbose
```

The following output is generated:

```
When it comes to premium comfort and style, the Citroen C6 delivers in spades.
This luxurious and powerful vehicle is sure to make a statement, wherever you
take it. Combining a range of up to 950km with a diesel engine, the Citroen C6
offers a reliable and efficient journey.

The exterior of the Citroen C6 is sleek and sophisticated, with a range of
features that provide an unmistakable style. The signature grille is sure to
turn heads, while the large alloy wheels and chrome accents add a touch of
class. Inside, the interior is designed to offer the utmost in comfort and
convenience, with plenty of space and adjustable seating.

The Citroen C6 is powered by a 3.0-litre diesel engine that offers up to 258bhp
and a range of up to 950km. The engine is efficient and reliable, providing
plenty of power for both city and highway driving. The engine is also coupled
with a six-speed automatic transmission, providing a smooth and comfortable
ride. The Citroen C6 also features a range of advanced safety features,
including adaptive cruise control and lane-keeping assist.

The Citroen C6 was first introduced in 2005, and production continued until the
end of 2012. During its production, the Citroen C6 was praised for its luxurious
and comfortable design, as well as its impressive performance and range. The
Citroen C6 was also praised for its ability to combine comfort with style and
efficiency.

Article by:
Serge van den Oever
Article date: 4/23/2023
```