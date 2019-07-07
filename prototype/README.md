# Prototype coming soon...

The twiggy system is a CLI driven system.

These notes sketched quickly from discussions with other contributing members.

# UI migrations

Creating UIs could be done in a code-first-ui technique similar to code-first model similar to Sequelize.

> An example might look like this:

````
module.exports = function(twiggy, ControlTypes) {
  const Contact = twiggy.define('Contact', {
    first_name: {
      type: ControlTypes.TEXTBOX,
      allowNull: true
    },
    last_name: {
      type: ControlTypes.TEXTBOX,
      allowNull: true
    },
    sameAsBillingAddress: {
      type: ControlTypes.CHECKBOX,
      tristate: true
    },
    address: {
      type: ControlTypes.TEXTBOX,
      allowNull: true
    },
    state: {
      type: ControlTypes.DROPLIST,
      allowNull: true
    },
    email: {
      type: ControlTypes.TEXTBOX,
      allowNull: true,
      regex: '^clever_email_regex'
    }
  }, {
    formName: 'contacts'
  });

  return Contact;
};

````

TODO: Create a system of UI-layout, perhaps CSS grid, to allow placement of fields/controls on a form


# twiggy's I/O model (tio)

There should be an input/output model based on JSON objects that communicate as input or are generated as output from a Generator. JSON may not be strictly required as an output since output in many cases should be a file or set of files: HTML/CSS/React, etc. Perhaps, file generation is a function of the system based on a JSON input: perhaps a "file-generator".

# Generators
A generator takes an input(s) and uses it to generate and ouput(s). Generators can be chained together so that one generator can consume the output from one or more other generators.

An example is a graphql-generator. Starting with its output, it would generate schema.js and/or resolvers.js depending on "switches". Its input would some JSON-based model that drove the output.

Another example is a react-component-generator. As its output it generates React component(s). Chained or piped to a file-generator it would save to local disk. Perhaps as an alternative in a dynamic CMS-type system the react-component output could be piped to a html-generator that would go over and http-generator directly to a browser.

# Thoughs on chaining/piping generators like unix command pipes
Considering unix pipes with stdin, stdout, etc...
I’m trying to figure out a system of “generators” that take input and produce output and can be chained together.
I was thinking this the other day but you put me in mind some of the complexity in real-world apps.
Specifically, “react with redux” vs “react with hooks” might be “react-basic-generator” -> “redux-generator” vs “react-basic-generator” -> “hooks-generator”.
that is:
Take some input, produce a React component as output. Take the React component as an input and produce a React-with-redux output.
These could be chained at will to produce powerful and flexible outputs.
