The **bike-description** recipe is a very simple recipe that enables you to write a description of a bike.

This recipe is to show-case the following features of AI Writer:

- Define the available CLI parameters supported by the **bike-description** recipe 
- Define a powerful prompt template that can use parameter values and functions to generate the description
- Define custom JavaScript functions in the `functions.js` file that can be used in the prompt template
- The use of functions in the `functions.js` file that are defined in other JavaScript files, e.g. `util.js`

## Example output

Given the command:

```
npx ai-writer bike-description --name "VanMoof S3" --type "Electric" --range "90" --output "bikes/VanMoof-S3" --verbose
```

The following output is generated:

```
The VanMoof S3 Electric Bike is a revolutionary way to upgrade your commute.
This electric bike offers a powerful performance and a reliable range of 90
kilometers on a single charge. The sleek design of the VanMoof S3 Electric Bike
makes it the perfect choice for urban cyclists looking for a stylish ride.

The VanMoof S3 Electric Bike is designed with a powerful motor that can reach
speeds up to 25km/h, allowing you to easily navigate city streets. The bike is
equipped with a smart display that allows you to easily keep track of your
speed, battery life, and other important data.

The VanMoof S3 Electric Bike is also equipped with a rear light and an
integrated front light for increased visibility. The bike’s frame is built with
a lightweight aluminum alloy, making it easy to maneuver and carry, if
necessary. The bike also features puncture-resistant tires and front and rear
fenders to keep you clean and dry in wet weather.

The VanMoof S3 Electric Bike is a great choice for both urban commuters and
recreational cyclists alike. With its reliable range of 90 kilometers and its
powerful motor, the VanMoof S3 Electric Bike can take you anywhere you need to
go. The bike’s sleek design and reliable performance make it the perfect choice
for anyone looking for a reliable electric bike.

History of the VanMoof S3 Electric Bike

The VanMoof S3 Electric Bike was first produced in 2017 and quickly became one
of the most popular electric bikes on the market. The bike was designed with an
emphasis on style and performance, making it a great choice for those looking
for an electric bike with a modern look and reliable range. Production of the
bike stopped in 2020 due to the company’s focus on newer models.

Article Author: Serge van den Oever
Article Date: 6/4/2023
```

By the way: always check the facts, because the text above is NOT correct. The VanMoof S3 Electric Bike was first produced in 2020, not in 2017. But that is not the point of this example. The point is that you can easily generate a text like this with AI Writer.