import moment from 'moment';
import { isNumber } from 'util';
import Models from '../models';
// import fileUpload from '../helpers/fileUpload';
// import strHelpers from '../helpers/strings';

// const { snakeCaseToCamelCase } = strHelpers;

export default {
  create: async (params) => {
    const {
      estado: estadoId,
      tags: tagsIdsString,
      newTags: newTagsString,
      userId: usuarioRegistroEntrada,
      subcategoria: subId,
      categoria: catId,
    } = params;

    const createParams = {
      ...params,
      usuarioRegistroEntrada,
    };

    delete createParams.tags;
    delete createParams.newTags;
    delete createParams.userId;
    delete createParams.subCategoria;
    delete createParams.categoria;
    // delete rawCreateParams.estado;

    // const createParams = Object.keys(rawCreateParams).reduce((acc, item) => {
    //   const camelCaseKey = snakeCaseToCamelCase(item);
    //   acc[camelCaseKey] = rawCreateParams[item];
    //   return acc;
    // }, {});

    const newTagsNames = JSON.parse(newTagsString);
    const tagsIds = JSON.parse(tagsIdsString);

    const newTags = await Promise.all(newTagsNames.map(async item => Models.Etiquetas.create({
      nombreEtiqueta: item,
    })));
    const tags = await Promise.all(tagsIds.map(async item => Models.Etiquetas.findByPk(item)));

    const objetoSimple = await Models.Objetos.create(createParams);

    const subCategoria = await Models.Subcategorias.findByPk(subId);
    const categoria = await Models.Categorias.findByPk(catId);
    const estado = await Models.Estados.findByPk(estadoId);
    const usuario = await Models.Usuarios.findByPk(usuarioRegistroEntrada);

    await objetoSimple.addEtiquetas([...tags, ...newTags]);
    await objetoSimple.setSubcategoria(subCategoria);
    await objetoSimple.setCategoria(categoria);
    await objetoSimple.setEstado(estado);
    await objetoSimple.setUsuarioEntrada(usuario);

    console.log(objetoSimple);

    return Models.Objetos.findByPk(objetoSimple.id, {
      include: [{ all: true }],
    });
  },
  createFile: async (params, file) => {
    /* const {
      estado: estadoId,
      tags: tagsIdsString,
      newTags: newTagsString,
      userId: usuarioRegistroEntrada,
      subcategoria: subId,
      categoria: catId,
      fotoPath,
      fotoNombre,
    } = params; */
    console.log(params, file);
    return { id: file.name };

    /* let url = '';
    if (fotoNombre && fotoPath) { url = await fileUpload(fotoPath, fotoNombre); }

    const createParams = {
      ...params,
      url,
      usuarioRegistroEntrada,
    };

    delete createParams.tags;
    delete createParams.newTags;
    delete createParams.userId;
    delete createParams.subCategoria;
    delete createParams.categoria;
    delete createParams.fotoPath;
    delete createParams.fotoNombre; */
    // delete rawCreateParams.estado;

    // const createParams = Object.keys(rawCreateParams).reduce((acc, item) => {
    //   const camelCaseKey = snakeCaseToCamelCase(item);
    //   acc[camelCaseKey] = rawCreateParams[item];
    //   return acc;
    // }, {});

    // const newTagsNames = JSON.parse(newTagsString);
    // const tagsIds = JSON.parse(tagsIdsString);
    /* const newTagsNames = newTagsString;
    const tagsIds = tagsIdsString;

    const newTags = await Promise.all(newTagsNames.map(async item => Models.Etiquetas.create({
      nombreEtiqueta: item,
    })));
    const tags = await Promise.all(tagsIds.map(async item => Models.Etiquetas.findByPk(item)));

    const objetoSimple = await Models.Objetos.create(createParams);

    const subCategoria = await Models.Subcategorias.findByPk(subId);
    const categoria = await Models.Categorias.findByPk(catId);
    const estado = await Models.Estados.findByPk(estadoId);
    const usuario = await Models.Usuarios.findByPk(usuarioRegistroEntrada);

    await objetoSimple.addEtiquetas([...tags, ...newTags]);
    await objetoSimple.setSubcategoria(subCategoria);
    await objetoSimple.setCategoria(categoria);
    await objetoSimple.setEstado(estado);
    await objetoSimple.setUsuarioEntrada(usuario);

    console.log(objetoSimple);

    return Models.Objetos.findByPk(objetoSimple.id, {
      include: [{ all: true }],
    }); */
  },
  get: async (objectId) => {
    const objeto = await Models.Objetos.findByPk(objectId, {
      include: [{
        all: true,
      }],
    });

    return objeto;
  },
  find: async (params) => {
    const {
      page,
      subcategoria,
      nombre,
      categoria,
      // etiquetas,
    } = params;

    if (!isNumber(parseInt(page, 10))) {
      throw new Error({ status: 403, message: 'Invalid page Number' });
    }

    const offset = 10 * parseInt(page, 10);
    const { Op } = Models.Sequelize;

    if (!subcategoria && !nombre && !categoria) {
      return Models.Objetos.findAll({
        where: { fechaEgreso: null },
        include: [
          { association: 'EstadoObjeto' },
          { association: 'UsuarioEntrada' },
          { association: 'UsuarioSalida' },
          { association: 'Etiquetas' },
          { association: 'Subcategoria' },
          { association: 'Categoria' },
        ],
        limit: 10,
        offset,
      });
    }

    if (subcategoria > 0 && nombre) {
      const subCategoriaInstance = await Models.Subcategorias.findByPk(subcategoria);
      return subCategoriaInstance.getObjetos({
        where: {
          nombre: { [Op.like]: `%${nombre}%` },
          fechaEgreso: null,
        },
        include: [
          { association: 'EstadoObjeto' },
          { association: 'UsuarioEntrada' },
          { association: 'UsuarioSalida' },
          { association: 'Etiquetas' },
          { association: 'Subcategoria' },
          { association: 'Categoria' },
        ],
        limit: 10,
        offset,
      });
    }

    if (categoria > 0 && nombre) {
      const categoriaInstance = await Models.Categorias.findByPk(categoria);
      return categoriaInstance.getObjetos({
        where: {
          nombre: { [Op.like]: `%${nombre}%` },
          fechaEgreso: null,
        },
        include: [
          { association: 'EstadoObjeto' },
          { association: 'UsuarioEntrada' },
          { association: 'UsuarioSalida' },
          { association: 'Etiquetas' },
          { association: 'Subcategoria' },
          { association: 'Categoria' },
        ],
        limit: 10,
        offset,
      });
    }

    if (subcategoria > 0) {
      const subCategoryInstance = await Models.Subcategorias.findByPk(subcategoria);
      return subCategoryInstance.getObjetos({
        where: { fechaEgreso: null },
        include: [
          { association: 'EstadoObjeto' },
          { association: 'UsuarioEntrada' },
          { association: 'UsuarioSalida' },
          { association: 'Etiquetas' },
          { association: 'Subcategoria' },
          { association: 'Categoria' },
        ],
        limit: 10,
        offset,
      });
    }

    if (categoria > 0) {
      const categoryInstance = await Models.Categorias.findByPk(categoria);
      return categoryInstance.getObjetos({
        where: { fechaEgreso: null },
        include: [
          { association: 'EstadoObjeto' },
          { association: 'UsuarioEntrada' },
          { association: 'UsuarioSalida' },
          { association: 'Etiquetas' },
          { association: 'Subcategoria' },
          { association: 'Categoria' },
        ],
        limit: 10,
        offset,
      });
    }

    return Models.Objetos.findAll({
      where: {
        nombre: { [Op.like]: `%${nombre}%` },
        fechaEgreso: null,
      },
      include: [
        { association: 'EstadoObjeto' },
        { association: 'UsuarioEntrada' },
        { association: 'UsuarioSalida' },
        { association: 'Etiquetas' },
        { association: 'Subcategoria' },
        { association: 'Categoria' },
      ],
      limit: 10,
      offset,
    });
  },
  getDonate: async (page) => {
    const { Op } = Models.Sequelize;
    if (!isNumber(parseInt(page, 10))) {
      throw new Error({ status: 403, message: 'Invalid page Number' });
    }
    const offset = 10 * parseInt(page, 10);
    const objetos = await Models.Objetos.findAll({
      where: {
        fechaIngreso: {
          [Op.lte]: moment().subtract(6, 'months').toDate(),
        },
        fechaEgreso: null,
      },
      limit: 10,
      offset,
    });

    return objetos;
  },

  postDonate: async (params) => {
    const {
      objetos,
      userId,
    } = params;

    const dateNow = moment().toDate();

    await objetos.forEach(async (objetoId) => {
      const objeto = await Models.Objetos.findByPk(objetoId);
      await objeto.update({
        fechaEgreso: dateNow, fechaActualizacion: dateNow, usuarioRegistroSalida: userId,
      });
    });


    return Promise.all(objetos.map(async item => Models.Objetos.findByPk(item, {
      include: [
        { association: 'EstadoObjeto' },
        { association: 'UsuarioEntrada' },
        { association: 'UsuarioSalida' },
        { association: 'Etiquetas' },
        { association: 'Subcategoria' },
        { association: 'Categoria' },
      ],
    })));
  },

  update: async (objetoId, params) => {
    const {
      nombre,
      informacionAdicional,
      tags: tagsIdsString,
      newTags: newTagsString,
      subCategoria: subId,
    } = params;

    const objeto = await Models.Objetos.findByPk(objetoId);

    const dateNow = moment().toDate();
    const updateThis = {};
    if (nombre) {
      updateThis.nombre = nombre;
    }
    if (informacionAdicional) {
      updateThis.informacionAdicional = informacionAdicional;
    }
    updateThis.fechaActualizacion = dateNow;

    let tags = [];
    if (tagsIdsString) {
      tags = await Promise.all(tagsIdsString.map(async item => Models.Etiquetas.findByPk(item)));
    }

    let newTags = [];
    if (newTagsString) {
      newTags = await Promise.all(newTagsString.map(async item => Models.Etiquetas.create({
        nombreEtiqueta: item,
      })));
    }

    if (newTagsString && tagsIdsString === []) {
      await objeto.addEtiquetas([...newTags]);
    } else if (newTagsString || tagsIdsString) {
      await objeto.setEtiquetas([...tags, ...newTags]);
    }

    if (subId) {
      const subCategoria = await Models.Subcategorias.findByPk(subId);
      await objeto.setSubcategoria(subCategoria);
    }

    await objeto.update(updateThis);

    return Models.Objetos.findByPk(objeto.id, {
      include: [{ all: true }],
    });
  },
};
