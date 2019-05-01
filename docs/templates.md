# Templates

## Base templates and inheritance

It is incredibly easy to succumb to the temptation of copying and pasting templates when you need to make a new one. A better alternative is sticking to a system of inheritance and selective overrides.

When possible, inheriting from a base template is preferable to writing your own. The base templates are built to respond to configuration options available to site builders in the UI (such as the checkbox to display or hide field labels). They also make sure the templates will work with potential changes from modules (via something like a preprocess function).

A base template is the least specific version of an entity template. Examples include:

  - node.html.twig
  - block.html.twig
  - field.html.twig
  - paragraph.html.twig

Any more specific templates should, if possible, inherit from these bases.

## Configuration objects

Many of Bear Skin's base templates have been developed to accept configuration objects as arguments to the `include` or `embed` Twig statements. In these cases, you can pass selective overrides that give you a great deal of control over your output while also maintaining a sane system of inheritance. See each base template for examples of all the available options. However, there are some ideas that remain consistent from template to template.

### element

Each element accepts a string in the 'element' key, which changes the HTML element that is rendered. E.g.

```
{% include 'paragraph.html.twig' with {
  'paragraph_wrapper': {
    'element': 'section',
  },
} %}
```

### classes

Each element accepts an array of additional classes in the `classes` key. You can include Twig expressions that evaluate to strings in these arrays. For example, you can use logic operators to conditionally apply a class, like this:

```
{% include 'node.html.twig' with {
  'node_wrapper': {
    'classes': [
      logged_in ? 'user-logged-in' : 'user-logged-out',
    ],
  },
} %}
```

### attributes

Each element accepts an object of HTML attributes as key-value pairs. For example:

```
{% include 'field.html.twig' with {
  field_item: {
    'attributes': {
      'data-type': entity_type,
    }
  },
} %}
```


### Overall Example

The following template will output an unordered list of all the field values. It also applies some extra classes to these elements, and in one case sets a data attribute.

```
{# field--list.html.twig #}
{% include 'field.html.twig' with {
  field_wrapper: {
    'element': 'article',
    'classes': ['fancy-list'],
    'attributes': {
      'data-foo': 'bar',
    }
  },
  field_items: {
    'element': 'ul',
    'classes': ['fancy-list__inner'],
  },
  field_item: {
    'element': 'li',
    'classes': ['fancy-list__item'],
  },
} %}
```

## Overriding blocks

Each of the base templates has overridable Twig blocks. These can be used to further customize the output of your templates.

### Examples

#### Facilitate a two-column appearance
```
{# node--article--teaser.html.twig #}
{% extends 'node.html.twig' %}
{% block content %}
  <div class="left">
    {{ content.field_image }}
  </div>
  <div class="right">
    {{ content|without('field_image') }}
  </div>
{% endblock %}
```

### Use embed statement to combine config and block overrides
```
{# field--cta-text.html.twig #}
{% embed 'field.html.twig' with {
  'field_wrapper': {
    'classes': ['field__content--outer'],
  },
} %}
  {% block content %}
    <div class="field__content--inner">
      {{ content }}
    </div>
  {% endblock %}
{% endembed %}
```

## Completely overriding template output
If you need to take matters into your own hands, you have the option to completely override the output of a template with the `override` block. This should be a method of last resort and only used in the event your template needs to do something really out of the ordinary.

The benefit of using this instead of writing your own template from scratch is that you still have access to the base template's variables. E.g.

```
{# node--press-release--full.html.twig #}
{% extends 'node.html.twig' %}
{% block override %}
  <section{{ attributes }}>
    <div class="top">
      <h1 {{ title_attributes }}>{{ label }}</h1>
      <span class="date">{{ date }}</span>
      {{ content.field_image }}
    </div>
    <div{{ content_attributes.addClass('bottom') }}>
      {{ content|without('field_image') }}
    </div>
  </section>
{% endblock %}
```
